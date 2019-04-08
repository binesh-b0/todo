pragma solidity ^0.5.0;

contract todo{
    struct tasks{
        string title;
        bool status;
    }
    mapping(uint => tasks) task;
    uint[] public id; 
    
    event newTaskAdded(uint id,string title,bool status);
    
    function newTask(uint _id,string memory _title,bool _status) public {
        id.push(_id);
        task[_id] = tasks(_title,false);
        emit newTaskAdded(_id,_title,_status);
    }
    function getTask(uint _id) public view returns(string memory _title,bool _status,uint count){
        _title = task[_id].title;
        _status = task[_id].status;
        count=id.length;
    }
    function setStatus(uint _id,bool _status) public {  
        task[_id].status=_status;    
    
    }

}