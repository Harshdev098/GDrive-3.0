// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.5.0 <0.9.0;

contract Drive {
    struct List {
        bool status;
        address userAddress;
    }
    struct FileOwnership {
        string url;
        bool access;
    }
    struct UploadData{
        string url;
        string name;
        string date;
        uint size;
    }
    mapping(address => UploadData[]) public uploads;
    mapping(address => mapping(string => List[])) public AccessList;
    mapping(address => FileOwnership[]) public ownership;

    event accessGiven(address owner, string url, address user);
    event accessRevoked(address owner, string url, address user);
    event DebugUpload(address sender, string url);

    function uploadFile(string memory url,string memory name,string memory date,uint size) public {
        require(bytes(url).length > 0, "URL cannot be empty");
        uploads[msg.sender].push(UploadData(url,name,date,size));
        emit DebugUpload(msg.sender, url);
    }

    function getAccessList(
        string memory url
    ) public view returns (List[] memory) {
        return AccessList[msg.sender][url];
    }

    function displayData() public view returns (string[] memory) {
    uint count = 0;
    for (uint i = 0; i < ownership[msg.sender].length; i++) {
        if (ownership[msg.sender][i].access == true) {
            count++;
        }
    }
    string[] memory files = new string[](count);
    uint index = 0;
    for (uint i = 0; i < ownership[msg.sender].length; i++) {
        if (ownership[msg.sender][i].access == true) {
            files[index] = ownership[msg.sender][i].url;
            index++;
        }
    }
    return files;
}

    function displayUserFiles(
        address user
    ) public view returns (UploadData[] memory) {
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
            if (
                keccak256(bytes(ownership[user][i].url)) ==
                keccak256(bytes(url))
            ) {
                alreadyHasFile = true;
                if (ownership[user][i].access == false) {
                    ownership[user][i].access = true;
                    break;
                } else {
                    break;
                }
            }
        }

        if (!alreadyHasFile) {
            ownership[user].push(FileOwnership(url, true));
        }
    }

    function DenyAccess(string memory url, address user) public {
        for (uint256 i = 0; i < AccessList[msg.sender][url].length; i++) {
            if (AccessList[msg.sender][url][i].userAddress == user) {
                AccessList[msg.sender][url][i].status = false;
                for (uint256 j = 0; j < ownership[user].length; j++) {
                    if (
                        keccak256(bytes(ownership[user][j].url)) ==
                        keccak256(bytes(url))
                    ) {
                        ownership[user][j].access = false;
                    }
                }
                break;
            }
        }
    }
}