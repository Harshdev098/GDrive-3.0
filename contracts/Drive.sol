// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.5.0 <0.9.0;

contract Drive {
    struct List {
        bool status;
        address userAddress;
    }
    mapping(address => string[]) public uploads;
    mapping(address => mapping(string => List[])) public AccessList;
    mapping(address => string[]) public ownership;

    event accessGiven(address owner, string url, address user);
    event accessRevoked(address owner, string url, address user);
    event DebugUpload(address sender, string url);

    function uploadFile(string memory url) public {
        require(bytes(url).length > 0, "URL cannot be empty");
        require(msg.sender != address(0), "Invalid sender address");
        uploads[msg.sender].push(url);
        emit DebugUpload(msg.sender, url);
    }

    function getAccessList(
        string memory url
    ) public view returns (List[] memory) {
        return AccessList[msg.sender][url];
    }

    function displayData() public view returns (string[] memory) {
        return ownership[msg.sender];
    }

    function displayUserFiles(
        address user
    ) public view returns (string[] memory) {
        return uploads[user];
    }

    function shareAccess(string memory url, address user) public {
        bool userExists;
        for (uint256 i = 0; i < AccessList[msg.sender][url].length; i++) {
            if (
                AccessList[msg.sender][url][i].userAddress == user &&
                AccessList[msg.sender][url][i].status == false
            ) {
                AccessList[msg.sender][url][i].status = true;
                userExists = true;
                break;
            }
        }
        if (!userExists) {
            AccessList[msg.sender][url].push(List(true, user));
        }
        bool alreadyHasFile = false;
        for (uint256 i = 0; i < ownership[user].length; i++) {
            if (keccak256(bytes(ownership[user][i])) == keccak256(bytes(url))) {
                alreadyHasFile = true;
                break;
            }
        }

        if (!alreadyHasFile) {
            ownership[user].push(url);
        }
        emit accessGiven(msg.sender, url, user);
    }

    function DenyAccess(string memory url, address user) public {
        for (uint256 i = 0; i < AccessList[msg.sender][url].length; i++) {
            if (AccessList[msg.sender][url][i].userAddress == user) {
                AccessList[msg.sender][url][i].status = false;
                emit accessRevoked(msg.sender, url, user);
                break;
            }
        }
    }
}
