function onBodyLoad()
{
    // alert("A")
    $(".datePicker2").datepicker();

    $(".datePicker2").datepicker( "option", "dateFormat", "dd-MM-yy");
    $("#dtFrom").datepicker('setDate', new Date());
	$("#dtTo").datepicker('setDate', new Date());


    $('.resultContParent').hide();
    $('.dateResultContParent').hide();
	
	$('.clearHolder').on("click", clearClicked);
	$('.tday').on("click", tdayClicked);

}

//let tt;
function clearClicked(event){
	//console.log("AA", event)
	//tt = event;
	event.target.parentElement.querySelector('input').value = ""

}

function tdayClicked(event){
	//$("#dtFrom").datepicker('setDate', new Date());
	$(event.target.parentElement.querySelector('input')).datepicker('setDate', new Date());
}

function calculate(){
	let calWhat = -1;
	
	/*
		calWhat
		0 -- calculate days between two days
		1 -- calculate from date 
		2 -- calculate to date
	*/
	
	if ($("#inpDays").val().length === 0){
		calWhat = 0;
	}
	else{
		dayCount = +$("#inpDays").val();
	}
	
	let dtTemp;
	if ($("#dtFrom").val().length === 0){
		//if date is blank assign it minus 1. 
		dtFrom = -1;
		calWhat = 1;
	}
	else{
		dtFrom = new Date($("#dtFrom").val())
	}
	
	if ($("#dtTo").val().length === 0){
		//if date is blank assign it minus 1. 
		dtTo = -1;
		calWhat = 2;
	}
	else{
		dtTo = new Date($("#dtTo").val())
	}
	
	switch (calWhat){
		case 0:
			daysInBetween = getDaysBetween(dtFrom, dtTo)
			$("#inpDays").val(daysInBetween);
		break;
		
		case 1:
			//calculate from date
			dtTemp = new Date(dtTo);
			dtTemp.setDate(dtTemp.getDate() - dayCount);
			$("#dtFrom").datepicker("setDate", dtTemp);
		break;
		
		case 2:
			//calculate to date
			dtTemp = new Date(dtFrom);
			dtTemp.setDate(dtTemp.getDate() + dayCount);
			$("#dtTo").datepicker("setDate", dtTemp);
		break;
		
		default:
	}
	
	
}


let dtFrom, dtTo, dayCount;
function LetsGo(){
    dtTo = new Date($("#dtTo").val());
    daysSince = +$("#inpDays").val();

    if (daysSince === 0){
        dtFrom = new Date($("#dtFrom").val());
        

        let daysInBetween = getDaysBetween(dtFrom, dtTo)
        
        // console.log({daysInBetween})
        displayDays(daysInBetween);
        
        let weeksInBetween = (Math.floor(daysInBetween / 7))
        displayWeeks(weeksInBetween)
    
        $('.resultContParent').show();
        $('.dateResultContParent').hide();

    }
    else
    {
        f = new Date(dtTo);
        f.setDate(f.getDate() + daysSince)
        $("#dtFrom").datepicker("setDate", f);
        $('.dateValue').text($("#dtFrom").val())
        $('.dateResultContParent').show();
        $('.resultContParent').hide();

    }

   
}

function displayWeeks(param){
    if (param === 1){
        $('.weeksHolder .resultLabel').text("week")
    }
    else{
        $('.weeksHolder .resultLabel').text("weeks")
    }

    $('.resultCont .weeksValue').text(param);
}

function displayDays(param){
    if (param === 1){
        $('.daysHolder .resultLabel').text("day")
    }
    else{
        $('.daysHolder .resultLabel').text("days")
    }

    $('.resultCont .daysValue').text(param);
}


function getDaysBetween(dtA, dtB){
    let nMilliSecs = dtB - dtA;
    
    //
    if (nMilliSecs < 0){nMilliSecs = nMilliSecs*-1}


    return (nMilliSecs / (1000 * 60 * 60 * 24))
}

function getMonthsInBetween(){

}