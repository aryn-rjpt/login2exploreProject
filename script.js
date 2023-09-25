
const token = "90931674|-31949327518470345|90961554";
const databaseName = "Student"
const relationName = "StudentRel"
let recordNo = 0;


$(document).ready(function () {
    formReset();
})

function validateData(){

    let rollNo = $("#rollNo").val();
    let fullName = $("#fullName").val();
    let studentClass = $("#studentClass").val();
    let birth = $("#birth").val();
    let address = $("#address").val();
    let enrolDate = $("#enrolDate").val();

    if (rollNo===""){
        alert("Roll Number can't be empty.")
        return;
    }
    if (fullName===""){
        alert("Name can't be empty.")
        return;
    }
    if (studentClass===""){
        alert("Class can't be empty.")
        return;
    }
    if (birth===""){
        alert("Birth Date can't be empty.")
        return;
    }
    if (address===""){
        alert("Address can't be empty.")
        return;
    }
    if (enrolDate===""){
        alert("Enrollment date can't be empty.")
        return;
    }

    return {
        "rollNo": rollNo,
        "fullName":fullName,
        "studentClass": studentClass,
        "birth": birth,
        "address": address,
        "enrolDate": enrolDate
    }
}

function formReset() {
    let fields = Array.from($(".form-control"));
    for (field of fields) {
        field.value = "";
        if (field.id != "rollNo") { field.disabled = "true" }
        $("#rollNo").removeAttr('disabled');

    }
    $("#saveBtn").attr("disabled", true);
    $("#updateBtn").attr("disabled", true);
    $("#resetBtn").attr("disabled", true);

    $("#rollNo").focus();

}


function getRollNo() {
    let rollNo = $("#rollNo").val();
    let rollNoObject = JSON.stringify({ "rollNo": rollNo })
    let getRollNoRequest = createGET_BY_KEYRequest(token, databaseName, relationName, rollNoObject);

    jQuery.ajaxSetup({ async: false });
    let result = executeCommand(getRollNoRequest, "/api/irl");
    jQuery.ajaxSetup({ async: true });

    let fields = Array.from($(".form-control"))
    for (field of fields) {
        field.disabled = false;
    }

    if (result.status == 200) {
        $("#updateBtn").removeAttr("disabled");
        $("#resetBtn").removeAttr("disabled");
        $("#saveBtn").attr("disabled", true);

        $("#rollNo").attr("disabled", "true");

        let completeData = JSON.parse(result.data)
        let data = completeData.record;
        recordNo = completeData.rec_no;
        document.getElementById('rollNo').value = data.rollNo
        document.getElementById('fullName').value = data.fullName
        document.getElementById('studentClass').value = data.studentClass
        document.getElementById('birth').value = data.birth
        document.getElementById('address').value = data.address
        document.getElementById('enrolDate').value = data.enrolDate
    }
    else {
        $("#saveBtn").removeAttr("disabled");
        $("#resetBtn").removeAttr("disabled");
        $("#updateBtn").attr("disabled", true);

        $("#fullName").focus();
    }

}


function saveStudent() {
    let studentData = validateData();
    
    if (typeof studentData=='undefined'){
        return
    }

    let putRequest = createPUTRequest(token, JSON.stringify(studentData), databaseName, relationName)
    jQuery.ajaxSetup({ async: false });
    let result = executeCommandAtGivenBaseUrl(putRequest, baseUrl, "/api/iml");
    jQuery.ajaxSetup({ async: true });

    formReset();
}

function updateStudent(){
    let studentData = validateData();
    
    if (typeof studentData=='undefined'){
        return
    }

    let updateRequest = createUPDATERecordRequest(token, JSON.stringify(studentData), databaseName, relationName, recordNo)
    jQuery.ajaxSetup({ async: false });
    let result = executeCommandAtGivenBaseUrl(updateRequest, baseUrl, "/api/iml");
    jQuery.ajaxSetup({ async: true });

    formReset();
}