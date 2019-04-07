pragma solidity ^0.5.0;

contract todo{
    struct tasks{
        string title;
        bool status;
    }
    
    mapping(uint => tasks) task;
    
    event newTaskAdded(uint id,string memory title,bool status);
    
    function newTask(uint _id,string memory _title,bool _status) public {
        task[_id] = tasks(_title,_status);
        emit newTaskAdded(_id,_title,_status);
    }
    function getTask(uint _id) public view returns(string memory _title,bool _status){
        _title = task[_id].title;
        _status = task[_id].status;
    }
    function setStatus(uint _id,bool _status) public {  
        task[_id].status=_status;    
    
    }
}