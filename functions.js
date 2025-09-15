
function showHideFPForm(act)
{
    if(act=="show")
    {
        $("#fpForm").fadeIn("slow");
    }
    else
    {
        $("#fpForm").fadeOut("slow");
    }
}
function showHideRVForm(vact){
	if(vact=="show")
    {
        $("#rvForm").fadeIn("slow");
        $("#fpForm").fadeOut("slow");
    }
    else
    {
        $("#rvForm").fadeOut("slow");

    }
}
function render() {
	gapi.signin.render('customBtn',{
	  'approvalprompt': 'force',
	  'callback': 'loginFinishedCallback',
	  'clientid': '559562280416-26ieroc47qlbj5jidl8l1re5n9e8v3dc.apps.googleusercontent.com',
	  'cookiepolicy': 'single_host_origin',
	  'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
	  'height': 'short'
	}); 
  }
function loginFinishedCallback(authResult) {
	if (authResult) {
	  if (authResult['error'] == undefined){
		gapi.auth.setToken(authResult); // Store the returned token.
		getUserInfo();                     // Trigger request to get the email address.
	  } else {
	  }
	} else {
	}
  }
function getUserInfo(){
	// Load the oauth2 libraries to enable the userinfo methods.
	gapi.client.load('oauth2', 'v2', function() {
		  var request = gapi.client.oauth2.userinfo.get();
		  request.execute(getEmailCallback);
		});
  }
function getEmailCallback(obj){
	//alert(obj['given_name']+","+obj['family_name']+","+obj['email']);
	checkADSNSLoginCredentials(obj['given_name'],obj['family_name'],obj['email'],$("#pg").val());
  }
//<!-- Place this asynchronous JavaScript just before your </body> tag -->
  
  (function() {
	var po = document.createElement('script');
	po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/client:plusone.js?onload=render';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
  })();
  
      
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
window.fbAsyncInit = function() 
{
	FB.init({
		appId      : '387548664734018',
		channelUrl : 'https://www.powersystemsdesign.com/channel.html', // Channel File
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		xfbml      : true,  // parse XFBML
		version    : 'v1.0'
	});
};

// Load the SDK Asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
}(document));

function postImgOnWall(destName,capt,desc,destURL,destThumb)
{
	var obj = 
	{
	    method: 'feed',
	    link: destURL,
	    picture: destThumb,
	    name: "PowerSystemsDesign - "+destName,
	    caption: capt,
	    description: desc
	};
	function callback(response) 
	{
		if (response && response.post_id) 
		{       
			//alert('Link Shared.');     
		} 
		else 
		{       
			//alert('Post was not published.');     
		}   
	}
    FB.ui(obj, callback);
}
function facebookInviteFriends()
{
	FB.ui({
		method: 'apprequests',
		message: 'Your Message dialog'
	});
}
function logADUserIn() 
{
	FB.login(function(response) 
	{
        if (response.authResponse) 
		{
            FB.api('/v1.0/me', function(response) 
			{
	            if(response.email && response.email!='undefined'&&response.email!="")
	            {
					checkADSNSLoginCredentials(response.first_name,response.last_name,response.email,$("#pg").val())
	            }
				else
				{
                	alert('You must provide email to login/signup to download the article.');
					return false;
            	}
	        });
        } 
		else 
		{
        }
    },{scope: 'public_profile,email'});
}
function checkADSNSLoginCredentials(firstName,lastName,email,pg)
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkADSNSLoginCredentials&FirstName="+firstName+"&LastName="+lastName+"&Email="+email+"&pg="+pg;
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			if(pg=="community")				
			{
				if(trim(data)=="Success") window.location.href="member-profile";
				else if(trim(data)=="Disabled") alert("Your account is disabled by admin. Please contact admin");
				else if(trim(data)=="Pending Confirmation") alert("Please confirm your email first");
				else alert("Invalid Username/Email or Password");
			}
			else
			{
				var aid = document.getElementById("aid").value;
				window.location.href = "makepdf.php?articleID="+aid;
				parent.closeADLoginPopUp();
			}
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });
}
function checkFP()
{
	if(!validateEmail($("#Email").val()))
	{
		alert("Please enter valid email address");
	}
	else
	{
		document.formSignup.submit();
	}
}
function checkSubscriptionFP()
{
	if(trim($("#FPEmail").val())=="")
    {
        alert("Email is required!");
    }
    else if(!validateEmail($("#FPEmail").val()))
	{
		alert("Please enter valid email address");
	}
	else
	{
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkSubscriptionFP&"+$("#formFP").serialize();
        $.ajax({
            url: filename,
            type: 'GET',
            dataType: 'html',
            beforeSend: function () {
            },
            success: function (data, textStatus, xhr) 
    		{
                var dataArr = data.split("~");
    			document.getElementById("messageFPHead").innerHTML = dataArr[0];
    			document.getElementById("messageFPText").innerHTML = dataArr[1];
    			document.getElementById("messageFPDiv").style.display = "inline";
    			
            },
            error: function (xhr, textStatus, errorThrown) 
    		{
    			alert("Could not get your login credentials due to technical error");
            }
        });
	}
}

function checkSubscriptionRV()
{
	if(trim($("#RVEmail").val())=="")
    {
        alert("Email is required!");
    }
    else if(!validateEmail($("#RVEmail").val()))
	{
		alert("Please enter valid email address");
	}
	else
	{
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkSubscriptionRV&"+$("#formRV").serialize();
        $.ajax({
            url: filename,
            type: 'GET',
            dataType: 'html',
            beforeSend: function () {
            },
            success: function (data, textStatus, xhr) 
    		{
                var dataArr = data.split("~");
    			document.getElementById("messageRVHead").innerHTML = dataArr[0];
    			document.getElementById("messageRVText").innerHTML = dataArr[1];
    			document.getElementById("messageRVDiv").style.display = "inline";
    			
            },
            error: function (xhr, textStatus, errorThrown) 
    		{
    			alert("Could not get your  credentials due to technical error");
            }
        });
	}
}

function openADLoginPopUp()
{
	$("#iframe_ad").fadeIn("slow");
}
function openMediaLoginPopUp(){
	$("#iframe_MediaAd").fadeIn("slow");
}
function openWPDSignupPopUp()
{
    $("#iframe_wpd").fadeIn("slow");
}
function registerWPRead()
{
    var filename = "https://www.powersystemsdesign.com/ajax.php?action=registerWPRead&PaperID="+$("#aid").val()+"&WPUserID="+$("#userPresent").val();
;
    console.log(filename);
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
        },
        error: function (xhr, textStatus, errorThrown) 
		{
        }
    });
}
function openWDSignupPopUp()
{
    $("#iframe_wd").fadeIn("slow");
}
function registerWRead()
{
    var filename = "https://www.powersystemsdesign.com/ajax.php?action=registerWRead&PaperID="+$("#aid").val()+"&WUserID="+$("#userPresent").val();
;
    console.log(filename);
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
        },
        error: function (xhr, textStatus, errorThrown) 
		{
        }
    });
}
function checkADLoginForm()
{
	var error=0;
	$inputs = $("#loginForm :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(error<=0)
	{
		checkADLoginCredentials();
	}
}
function checkADMediaLoginForm()
{
	var error=0;
	$inputs = $("#loginMediaForm :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(error<=0)
	{
		checkMediaLoginCredentials();
	}
}
function checkMediaLoginCredentials()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkMediaLoginCredentials&"+$("#loginMediaForm").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			//console.log(trim(data)+" Coming");
            if(trim(data)=="Success")
			{
				parent.closeMediaLoginPopUp();
				//var aid = document.getElementById("aid").value;
				window.location.href = "make_media_downloadpdf.php";
			}
			else alert("Invalid Username/Email or Password");
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });
}
function checkWPDSignupForm()
{
    var error=0;
    if(trim($("#FirstName").val())=="")
    {
        error++;
        alert("First Name is required!");
        $(this).focus();
        return false; 
    }
    else if(trim($("#LastName").val())=="")
    {
        error++;
        alert("Last Name is required!");
        $(this).focus();
        return false; 
    }
    else if(trim($("#Email").val())=="")
    {
        error++;
        alert("Email is required!");
        $(this).focus();
        return false; 
    }
    else if(!validateEmail($("#Email").val()))
    {
        error++;
        alert("Please enter valid email address!");
        $(this).focus();
        return false; 
    }
    else if(trim($("#CompanyName").val())=="")
    {
        error++;
        alert("Company Name is required!");
        $(this).focus();
        return false; 
    }
	if(error<=0)
	{
		saveWPD();
	}
}
function saveWPD()
{
    //alert(parent.document.getElementById("wpcid").value);
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=saveWPD&"+$("#formSignup").serialize()+"&wpcid="+parent.document.getElementById("wpcid").value+"&aid="+parent.document.getElementById("aid").value;
;
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
            var dataArr = data.split("~");
			if(trim(dataArr[0])=="Success")
			{
				parent.closeWPDLoginPopUp();
				parent.document.getElementById("userPresent").value = dataArr[1];
				parent.open3d(parent.document.getElementById("aid").value);
                parent.document.getElementById("aid").value="";
                parent.document.getElementById("wpcid").value="";
			}
			else alert("Could not save due to some technical error");
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not save due to some technical error");
        }
    });
}
function checkWDSignupForm()
{
    var error=0;
    if(trim($("#FirstName").val())=="")
    {
        error++;
        alert("First Name is required!");
        $(this).focus();
        return false; 
    }
    else if(trim($("#LastName").val())=="")
    {
        error++;
        alert("Last Name is required!");
        $(this).focus();
        return false; 
    }
    else if(trim($("#Email").val())=="")
    {
        error++;
        alert("Email is required!");
        $(this).focus();
        return false; 
    }
    else if(!validateEmail($("#Email").val()))
    {
        error++;
        alert("Please enter valid email address!");
        $(this).focus();
        return false; 
    }
    else if(trim($("#CompanyName").val())=="")
    {
        error++;
        alert("Company Name is required!");
        $(this).focus();
        return false; 
    }
	if(error<=0)
	{
		saveWD();
	}
}
function saveWD()
{
    //alert(parent.document.getElementById("wpcid").value);
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=saveWD&"+$("#formSignup").serialize()+"&wcid="+parent.document.getElementById("wcid").value+"&aid="+parent.document.getElementById("aid").value;
;
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
            var dataArr = data.split("~");
			if(trim(dataArr[0])=="Success")
			{
				parent.closeWDLoginPopUp();
				parent.document.getElementById("userPresent").value = dataArr[1];
				parent.open3d(parent.document.getElementById("aid").value);
                parent.document.getElementById("aid").value="";
                parent.document.getElementById("wcid").value="";
			}
			else alert("Could not save due to some technical error");
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not save due to some technical error");
        }
    });
}
function checkADLoginCredentials()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkADLoginCredentials&"+$("#loginForm").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			console.log(trim(data)+" Coming");
            if(trim(data)=="Success")
			{
				parent.closeADLoginPopUp();
				var aid = document.getElementById("aid").value;
				window.location.href = "makepdf.php?articleID="+aid;
			}
			else alert("Invalid Username/Email or Password");
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });
}
function checkGolfForm()
{
	var error=0;
	$inputs = $("#golfForm :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if((!validateEmail($("#EmailID").val())) && (error<=0)) 
	{
		error++;
		alert($("#EmailID").attr('for')+" is invalid!");
		$("#EmailID").focus();
		return false;
	}
	if(((document.getElementById("RentClubs_0").checked==false)) && ((document.getElementById("RentClubs_1").checked==false)) && (error<=0)) 
	{
		error++;
		alert("Rent Clubs?");
		return false;
	}
	if(error<=0)
	{
		saveGolfForm();
	}
}
function saveGolfForm()
{
	//var form=$("#golfForm");
	//var filename = "http://www.powersystemsdesign.com/ajax.php?action=saveGolfForm&"+$("#golfForm").serialize();
	//console.log(filename);
    $.ajax({
        url: "./ajax.php",
        type: "POST",
        data: $('#golfForm').serialize() + "&action=saveGolfForm",
        beforeSend: function () {
        },
        success: function (data) 
		{
			//alert(data);
			var rc = "";
			if($("#RentClubs_0").val()!="") rc = "Yes";
			else rc = "No";
			var dataArr = data.split("~");
			document.getElementById("playerNameText").innerHTML = $("#PlayerName").val();
			document.getElementById("companyAffText").innerHTML = $("#Company").val();
			document.getElementById("emailIDText").innerHTML = $("#EmailID").val();
			document.getElementById("rentClubsText").innerHTML = rc;
			document.getElementById("playerNo2Text").innerHTML = $("#Player2").val();
			document.getElementById("playerNo3Text").innerHTML = $("#Player3").val();
			document.getElementById("playerNo4Text").innerHTML = $("#Player4").val();
			
			$("#step1").fadeOut(0);
			$("#step2").fadeIn("slow");
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			//alert(xhr);
			alert("Could not save due to some technical error");
        }
    });	
}
/*function saveGolfForm()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=saveGolfForm&"+$("#golfForm").serialize();
	console.log(filename);
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			var rc = "";
			if($("#RentClubs_0").val()!="") rc = "Yes";
			else rc = "No";
			var dataArr = data.split("~");
			document.getElementById("playerNameText").innerHTML = $("#PlayerName").val();
			document.getElementById("companyAffText").innerHTML = $("#Company").val();
			document.getElementById("emailIDText").innerHTML = $("#EmailID").val();
			document.getElementById("rentClubsText").innerHTML = rc;
			document.getElementById("playerNo2Text").innerHTML = $("#Player2").val();
			document.getElementById("playerNo3Text").innerHTML = $("#Player3").val();
			document.getElementById("playerNo4Text").innerHTML = $("#Player4").val();
			
			$("#step1").fadeOut(0);
			$("#step2").fadeIn("slow");
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not save due to some technical error");
        }
    });	
}*/

function checkSignupForm()
{
	var error=0;
	$inputs = $("#formSignup :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(!validateEmail($("#Email").val())) 
	{
		error++;
		alert($("#Email").attr('for')+" is invalid!");
		$("#Email").focus();
		return false;
	}
	if($("#Password").val()!=$("#ConfirmPassword").val())
	{
		error++;
		alert("Both Passwords do not match");
		$("#Password").focus();
		return false;
	}
	if(error<=0)
	{
		checkEmail();
	}
}
function checkEditProfileForm()
{
	var error=0;
	$inputs = $("#formEditProfile :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(!validateEmail($("#Email").val())) 
	{
		error++;
		alert($("#Email").attr('for')+" is invalid!");
		$("#Email").focus();
		return false;
	}
	if(error<=0)
	{
		checkEditEmail();
	}
}
function checkLoginForm()
{
	var error=0;
	$inputs = $("#loginForm :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(error<=0)
	{
		checkLoginCredentials();
	}
}
function checkLoginCredentials()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkLoginCredentials&"+$("#loginForm").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			if(trim(data)=="Success") window.location.href="member-profile";
			else if(trim(data)=="Disabled") alert("Your account is disabled by admin. Please contact admin");
			else if(trim(data)=="Pending Confirmation") alert("Please confirm your email first");
			else alert("Invalid Username/Email or Password");
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });
}
function checkSubscriptionLoginForm()
{
	var error=0;
	$inputs = $("#subscriptionLoginForm :input"); 
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(error<=0)
	{
		checkSubscriptionLoginCredentials();
	}
}
function checkSubscriptionLoginCredentials()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkSubscriptionLoginCredentials&"+$("#subscriptionLoginForm").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			if(trim(data)=="Success") window.location.href="https://www.powersystemsdesign.com/pages/manage-subscription/112?f="+$("#form_type").val();
			else alert(data);
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });
}
function checkEmail()
{
	if((!validateEmail($("#Email").val())) || (trim($("#Email").val())=="")) 
	{
		if(!validateEmail($("#Email").val()))
			document.getElementById("em-id").innerHTML = "Invalid Email Address";
			alert("Invalid Email Address");
		if(trim($("#Email").val())=="")
			document.getElementById("em-id").innerHTML = "Enter Email Address";
			document.getElementById("ajAccountEmail").style.display = "inline";
			alert("Enter Email Address");
	}
	else
	{
		document.getElementById("em-id").innerHTML = "checking...";
		document.getElementById("ajAccountEmail").style.display = "inline";
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkEmail&"+$("#formSignup").serialize();
	    $.ajax({
	        url: filename,
	        type: 'GET',
	        dataType: 'html',
	        beforeSend: function () {
	        },
	        success: function (data, textStatus, xhr) 
			{
				document.getElementById("em-id").innerHTML = data;
				document.getElementById("ajAccountEmail").style.display = "inline";
				if(trim(data)=="Available") checkScreenName();
	        },
	        error: function (xhr, textStatus, errorThrown) 
			{
				alert("Could not check due to some technical error");
	        }
	    });
	}
}
function checkADSignupForm()
{
	//alert("coming");
	var error=0;
	$inputs = $("#formSignup :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(document.getElementById("em-id").innerHTML!="Available") 
	{
		error++;
		alert(document.getElementById("em-id").innerHTML);
		$("#Email").focus();
		return false;
	}
	if(!validateEmail($("#Email").val())) 
	{
		error++;
		alert($("#Email").attr('for')+" is invalid!");
		$("#Email").focus();
		return false;
	}
	if($("#Password").val()!=$("#ConfirmPassword").val())
	{
		error++;
		alert("Both Passwords do not match");
		$("#Password").focus();
		return false;
	}
	if(error<=0)
	{
		creatADMemberAccount();
	}
}
//media file
function checkMediaSignupForm(){
	var error=0;
	$inputs = $("#formMediaSignup :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(document.getElementById("em-mediaid").innerHTML!="Available") 
	{
		error++;
		alert(document.getElementById("em-mediaid").innerHTML);
		$("#Email").focus();
		return false;
	}
	if(!validateEmail($("#Email").val())) 
	{
		error++;
		alert($("#Email").attr('for')+" is invalid!");
		$("#Email").focus();
		return false;
	}
	if($("#Password").val()!=$("#ConfirmPassword").val())
	{
		error++;
		alert("Both Passwords do not match");
		$("#Password").focus();
		return false;
	}
	if(error<=0)
	{
		creatADMediaMemberAccount();
	}
}
function creatADMemberAccount()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=creatADMemberAccount&"+$("#formSignup").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
		  console.log(data);
        	if(data=="Success")
			{
				parent.closeADLoginPopUp();
				//window.parent.refresh();
				var aid = document.getElementById("aid").value;
				window.location.href = "makepdf.php?articleID="+aid;
			}
			else alert("Could not complete the sign up due to some technical error");
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });
}
function creatADMediaMemberAccount(){
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=creatMediaMemberAccount&"+$("#formMediaSignup").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
		  console.log(data);
        	if(data=="Success")
			{
				parent.closeMediaLoginPopUp();
				//window.parent.refresh();
				
				window.location.href = "make_media_downloadpdf.php";
			}
			else alert("Could not complete the sign up due to some technical error");
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });
}
function checkADEmail(op)
{
	if((!validateEmail($("#Email").val())) || (trim($("#Email").val())=="")) 
	{
		if(!validateEmail($("#Email").val()))
			document.getElementById("em-id").innerHTML = "Invalid Email Address";
			alert("Invalid Email Address");
		if(trim($("#Email").val())=="")
			document.getElementById("em-id").innerHTML = "Enter Email Address";
			document.getElementById("ajAccountEmail").style.display = "inline";
			alert("Enter Email Address");
	}
	else
	{
		//alert("coming");
		document.getElementById("em-id").innerHTML = "checking...";
		document.getElementById("ajAccountEmail").style.display = "inline";
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkADEmail&"+$("#formSignup").serialize();
	    $.ajax({
	        url: filename,
	        type: 'GET',
	        dataType: 'html',
	        beforeSend: function () {
	        },
	        success: function (data, textStatus, xhr) 
			{
				document.getElementById("em-id").innerHTML = data;
				document.getElementById("ajAccountEmail").style.display = "inline";
				if((data=="Available") && (op=="1"))
				{
					checkADSignupForm();	
				}else{
					alert(data);
				}
	        },
	        error: function (xhr, textStatus, errorThrown) 
			{
				console.log(errorThrown);
                alert("Could not check due to some technical error");
	        }
	    });
	}
}
//media file sign up download
function checkMediaEmail(op)
{
	if((!validateEmail($("#Email").val())) || (trim($("#Email").val())=="")) 
	{
		if(!validateEmail($("#Email").val()))
			document.getElementById("em-mediaid").innerHTML = "Invalid Email Address";
			alert("Invalid Email Address.");
		if(trim($("#Email").val())=="")
			document.getElementById("em-mediaid").innerHTML = "Enter Email Address";
			document.getElementById("ajMediaAccountEmail").style.display = "inline";
			alert("Enter Email Address");
	}
	else
	{
		document.getElementById("em-mediaid").innerHTML = "checking...";
		document.getElementById("ajMediaAccountEmail").style.display = "inline";
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkMediaEmail&"+$("#formMediaSignup").serialize();
	    $.ajax({
	        url: filename,
	        type: 'GET',
	        dataType: 'html',
	        beforeSend: function () {
	        },
	        success: function (data, textStatus, xhr) 
			{
				document.getElementById("em-mediaid").innerHTML = data;
				document.getElementById("ajMediaAccountEmail").style.display = "inline";
				if((data=="Available") && (op=="1"))
				{
					checkMediaSignupForm();	
				}else if(data=="Email Address Taken."){
					alert("Email aleady exists. Please login using same Email-ID.");
				}
	        },
	        error: function (xhr, textStatus, errorThrown) 
			{
				console.log(errorThrown);
                alert("Could not check due to some technical error");
	        }
	    });
	}
}
function checkEditEmail()
{
	if((!validateEmail($("#Email").val())) || (trim($("#Email").val())=="")) 
	{
		if(!validateEmail($("#Email").val()))
			document.getElementById("em-id").innerHTML = "Invalid Email Address";
		if(trim($("#Email").val())=="")
			document.getElementById("em-id").innerHTML = "Enter Email Address";
		document.getElementById("ajAccountEmail").style.display = "inline";
	}
	else
	{
		document.getElementById("em-id").innerHTML = "checking...";
		document.getElementById("ajAccountEmail").style.display = "inline";
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkEditEmail&"+$("#formEditProfile").serialize();
	    $.ajax({
	        url: filename,
	        type: 'GET',
	        dataType: 'html',
	        beforeSend: function () {
	        },
	        success: function (data, textStatus, xhr) 
			{
				document.getElementById("em-id").innerHTML = data;
				document.getElementById("ajAccountEmail").style.display = "inline";
				if(trim(data)=="Available") checkEditScreenName();
	        },
	        error: function (xhr, textStatus, errorThrown) 
			{
				alert("Could not check due to some technical error");
	        }
	    });
	}
}
function checkScreenName()
{
	if(trim($("#ScreenUserName").val())=="") 
	{
		if(trim($("#ScreenUserName").val())=="")
			document.getElementById("sun-id").innerHTML = "Enter Screen Name";
		document.getElementById("ajAccountHandle").style.display = "inline";
	}
	else
	{
		document.getElementById("sun-id").innerHTML = "checking...";
		document.getElementById("ajAccountHandle").style.display = "inline";
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkScreenUserName&"+$("#formSignup").serialize();
	    $.ajax({
	        url: filename,
	        type: 'GET',
	        dataType: 'html',
	        beforeSend: function () {
	        },
	        success: function (data, textStatus, xhr) 
			{
				document.getElementById("sun-id").innerHTML = data;
				document.getElementById("ajAccountHandle").style.display = "inline";
				if(trim(data)=="Available") creatMemberAccount();
	        },
	        error: function (xhr, textStatus, errorThrown) 
			{
				alert("Could not check due to some technical error");
	        }
	    });
	}
}
function checkEditScreenName()
{
	if(trim($("#ScreenUserName").val())=="") 
	{
		if(trim($("#ScreenUserName").val())=="")
			document.getElementById("sun-id").innerHTML = "Enter Screen Name";
		document.getElementById("ajAccountHandle").style.display = "inline";
	}
	else
	{
		document.getElementById("sun-id").innerHTML = "checking...";
		document.getElementById("ajAccountHandle").style.display = "inline";
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkEditScreenUserName&"+$("#formEditProfile").serialize();
	    $.ajax({
	        url: filename,
	        type: 'GET',
	        dataType: 'html',
	        beforeSend: function () {
	        },
	        success: function (data, textStatus, xhr) 
			{
				document.getElementById("sun-id").innerHTML = data;
				document.getElementById("ajAccountHandle").style.display = "inline";
				if(trim(data)=="Available") updateMemberAccount();
	        },
	        error: function (xhr, textStatus, errorThrown) 
			{
				alert("Could not check due to some technical error");
	        }
	    });
	}
}
function creatMemberAccount()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=creatMemberAccount&"+$("#formSignup").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			var dataArr = data.split("~");
			document.getElementById("messageHead").innerHTML = dataArr[0];
			document.getElementById("messageText").innerHTML = dataArr[1];
			document.getElementById("messageDiv").style.display = "inline";
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });
}
function updateMemberAccount()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=updateMemberAccount&"+$("#formEditProfile").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			var dataArr = data.split("~");
			document.getElementById("messageHead").innerHTML = dataArr[0];
			document.getElementById("messageText").innerHTML = dataArr[1];
			document.getElementById("messageDiv").style.display = "inline";
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });
}
function showStep2()
{
	var error=0;
	$inputs = $("#Step1Div :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(error<=0)
	{
		$("#Step1Div").fadeOut(0);
		$("#Step2Div").fadeIn("slow");
	}
}
function showManageStep2()
{
	var error=0;
	$inputs = $("#Step1Div :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(error<=0)
	{
		$("#Step1Div").fadeOut(0);
		$("#Step2Div").fadeIn("slow");
	}
}
function checkSubscriptionForm()
{
	var interest = 0;
	for(var i=1;i<=18;i++)
	{
		if(document.getElementById("Products"+i).checked==true)
		{
			interest = 1;
			break;
		}
	}
	
	var error=0;
	$inputs = $("#Step2Div :input");
   // console.log($inputs);
	$inputs.each(function(){
	   //console.log($(this));
		if($(this).hasClass('required'))
		{
            //console.log($(this));
			if(($(this).attr('for')!="undefined") && ($(this).val()=="") && ($(this).attr('id')!="SubPassword") && ($(this).attr('id')!="SubPasswordConfirm"))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
			if(($(this).attr('id')=="EmailID") && (!validateEmail($("#EmailID").val())) && (error<=0))
			{
				error++;
				alert($("#EmailID").attr('for')+" is invalid!");
				$("#EmailID").focus();
				return false;
			}
			if(($(this).attr('id')=="EmailID") && ($("#EmailID").val()!=$("#EmailIDConfirm").val()) && (error<=0))
			{
				error++;
				alert("Both Email addresses do not match!");
				$("#EmailID").focus();
				return false;
			}
            if(($("#SubPassword").val()=="") && (error<=0))
			{
				error++;
				alert("Please enter Password");
				$("#SubPassword").focus();
				return false;
			}
			if(($("#SubPassword").val()!=$("#SubPasswordConfirm").val()) && (error<=0))
			{
				error++;
				alert("Both Passwords do not match!");
				$("#SubPassword").focus();
				return false;
			}
			if((interest<=0) && (error<=0))
			{
				error++;
				alert('Choose the products of interest to you');
				$("#Products1").focus();
				return false;
			}
		}
	});
	if(error<=0)
	{
		saveSubscriptionForm();
	}
}
function saveSubscriptionForm()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=saveSubscriptionForm&"+$("#subscriptionForm").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			var dataArr = data.split("~");
            
			document.getElementById("messageHead").innerHTML = dataArr[0];
			document.getElementById("messageText").innerHTML = dataArr[1];
			document.getElementById("messageDiv").style.display = "inline";
			if(dataArr[0]=="SUCCESS!")
            {
            	alert(dataArr[1]);
                $('#subscriptionForm')[0].reset();

                showStep1();
			}
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });
}
function showStep1()
{
	$("#Step2Div").fadeOut(0);
	$("#Step1Div").fadeIn("slow");
}
function checkManageSubscriptionForm()
{
	var interest = 0;
	for(var i=1;i<=18;i++)
	{
		if(document.getElementById("Products"+i).checked==true)
		{
			interest = 1;
			break;
		}
	}
	
	var error=0;
	$inputs = $("#Step2Div :input");
   // console.log($inputs);
	$inputs.each(function(){
	   //console.log($(this));
		if($(this).hasClass('required'))
		{
            //console.log($(this));
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
			if((interest<=0) && (error<=0))
			{
				error++;
				alert('Choose the products of interest to you');
				$("#Products1").focus();
				return false;
			}
		}
	});
	if(error<=0)
	{
		saveManageSubscriptionForm();
	}
}
function saveManageSubscriptionForm()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=saveManageSubscriptionForm&"+$("#subscriptionForm").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			var dataArr = data.split("~");
            
			document.getElementById("messageHead").innerHTML = dataArr[0];
			document.getElementById("messageText").innerHTML = dataArr[1];
			document.getElementById("messageDiv").style.display = "inline";
			if(dataArr[0]=="SUCCESS!")
            {
                showStep1();
			}
        }
    });
}
function deleteSubscriptionProfile()
{
    var ans = confirm("Are you sure you want to delete this subscription profile?");
    if(ans==true)
    {
        var filename = "https://www.powersystemsdesign.com/ajax.php?action=deleteSubscriptionProfile&sid="+$("#sid").val();
        $.ajax({
            url: filename,
            type: 'GET',
            dataType: 'html',
            beforeSend: function () {
            },
            success: function (data, textStatus, xhr) 
    		{
                var dataArr = data.split("~");
    			if(dataArr[0]<=0)
                {
                    alert("Delete Successful!");
                    window.location  = 'manage-subscription';
                }
                else
                {
                    alert(dataArr[1]);
                }
            },
            error: function (xhr, textStatus, errorThrown) 
    		{
    			alert("Could not check due to some technical error");
            }
        });
    }
}
function checkAdvertisingForm()
{
	var error=0;
	$inputs = $("#advertisingForm :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(!validateEmail($("#EmailID").val())) 
	{
		error++;
		alert($("#EmailID").attr('for')+" is invalid!");
		$("#EmailID").focus();
		return false;
	}
	if(error<=0)
	{
		saveAdvertisingForm();
	}
}
function saveAdvertisingForm()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=saveAdvertisingForm&"+$("#advertisingForm").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			var dataArr = data.split("~");
			document.getElementById("messageHead").innerHTML = dataArr[0];
			document.getElementById("messageText").innerHTML = dataArr[1];
			document.getElementById("messageDiv").style.display = "inline";
			$('#advertisingForm')[0].reset();
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not check due to some technical error");
        }
    });	
}
function checkContactForm()
{
	var error=0;
	var recaptcha = $("#g-recaptcha-response").val();
	$inputs = $("#contactForm :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(!validateEmail($("#EmailID").val())) 
	{
		error++;
		alert($("#EmailID").attr('for')+" is invalid!");
		$("#EmailID").focus();
		return false;
	}
	if (recaptcha === "") 
    {
    	error++;
        alert('Please fill the captcha!');
        document.getElementById("basic").focus();
        return false;
    }
	if(error<=0)
	{
		saveContactForm();
	}
}
function saveContactForm()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=saveContactForm&"+$("#contactForm").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			var dataArr = data.split("~");
			if(dataArr[0]=="ERROR!"){
				alert(dataArr[1]);
			}else{
				document.getElementById("messageHead").innerHTML = dataArr[0];
				document.getElementById("messageText").innerHTML = dataArr[1];
				document.getElementById("messageDiv").style.display = "inline";
				$('#g-recaptcha-response').prop('checked', false);
				$('#contactForm')[0].reset();
			}
			
        },
        error: function (xhr, textStatus, errorThrown)
		{
			alert("Could not check due to some technical error");
        }
    });	
}
function checkJoinNewsLetterForm()
{
	var error=0;
	$inputs = $("#joinNewsletterForm :input");
	$inputs.each(function(){
		if($(this).hasClass('required'))
		{
			if(($(this).attr('for')!="undefined") && ($(this).val()==""))
			{
				error++;
				alert($(this).attr('for')+" is required!");
				$(this).focus();
				return false;
			}
		}
	});
	if(!validateEmail($("#JNEmail").val())) 
	{
		error++;
		alert($("#JNEmail").attr('for')+" is invalid!");
		$("#JNEmail").focus();
		return false;
	}
	if(error<=0)
	{
		saveJoinNewsLetterForm();
	}
}
function saveJoinNewsLetterForm()
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=saveJoinNewsLetterForm&"+$("#joinNewsletterForm").serialize();
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			var dataArr = data.split("~");
			document.getElementById("JNmessageHead").innerHTML = dataArr[0];
			document.getElementById("JNmessageText").innerHTML = dataArr[1];
			document.getElementById("JNmessageDiv").style.display = "inline";
			document.getElementById("joinNewsLetterDiv").style.display = "none";
			$('#joinNewsletterForm')[0].reset();
        },
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Could not save due to some technical error");
        }
    });	
}
function displayVideoDiv(hiddenID,rd)
{
	var ytID = document.getElementById("yt_"+hiddenID).value;
	var descVal = document.getElementById("desc_"+hiddenID).value;
	var titleVal = document.getElementById("title_"+hiddenID).value;
	var encryptId = document.getElementById("yed_"+hiddenID).value;
	var yt = '<object width="560" height="340"><param name="movie" value="https://www.youtube.com/v/'+ytID+'?modestbranding=1&amp;hl=en_US&amp;fs=1&amp;autoplay=1&amp;rel=0&amp;color1=0xFFFFFF&amp;color2=0xFFFFFF&amp;showinfo=0&amp;controls=0"><param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="always"><param name="wmode" value="opaque"><embed src="https://www.youtube.com/v/'+ytID+'?modestbranding=1&amp;hl=en_US&amp;fs=1&amp;autoplay=1&amp;rel=0&amp;color1=0xFFFFFF&amp;color2=0xFFFFFF&amp;showinfo=0&amp;controls=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="560" height="340" wmode="opaque"></object>';
	var link='<p>Share This Video </p><p> https://www.powersystemsdesign.com/shared-videos?vid='+encryptId+" </p> ";
	document.getElementById("youtubeDiv").innerHTML = yt;
	document.getElementById("videoTitleDiv").innerHTML = titleVal;
	document.getElementById("descriptionDiv").innerHTML = descVal;
	document.getElementById("ShareLink").innerHTML = link;
    //document.getElementById("vid").value = encryptId;
	$("#recordsDiv").fadeOut(0);
	$("#showVideoDiv").fadeIn("slow");
    var filename = "https://www.powersystemsdesign.com/ajax.php?action=view_video&vid="+encryptId;
	    $.ajax({
	        url: filename,
	        type: 'GET',
	        dataType: 'html',
	        beforeSend: function () {
	        },
	        success: function (data, textStatus, xhr) 
			{
				//console.log(data);
                //document.getElementById("VideoCommentSection").innerHTML = data;
	        },
	        error: function (xhr, textStatus, errorThrown) 
			{
				//console.log(errorThrown);
                //alert("Could not save due to some technical error");
	        }
	    });
}
function hideVideoDiv()
{
	$("#showVideoDiv").fadeOut(0);
	$("#recordsDiv").fadeIn("slow");
}
function trim(stringToTrim) 
{
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function validateEmail($email) 
{
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if( !emailReg.test( $email ) ) 
	{
		return false;
	} 
	else 
	{
		return true;
	}
}
function editPersonalProfile()
{
	$("#personalProfileDiv").fadeOut(0);
	$("#personalProfileEditDiv").fadeIn("slow");
}
function cancelEditProfileForm()
{
	$("#personalProfileEditDiv").fadeOut(0);
	$("#personalProfileDiv").fadeIn("slow");
}
function editProfilePic(act)
{
	if(act=='show') $("#editPicDiv").fadeIn("slow");	
	else $("#editPicDiv").fadeOut("slow");
}
function deleteProfilePic()
{
	var ans = confirm("Are you sure you want to delete your profile pic?");
	if(ans==true)
	{
		$("#isDelete").val("1");
		document.picForm.submit();
	}
}
function showReplyBox(aid,cid)
{
	if(document.getElementById("repliesDiv").style.display!="none")
	{
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=getReplies&aid="+aid+"&cid="+cid;
	    $.ajax({
	        url: filename,
	        type: 'GET',
	        dataType: 'html',
	        beforeSend: function () {
	        },
	        success: function (data, textStatus, xhr) 
			{
				document.getElementById("repliesDiv").innerHTML = data;
				$("#repliesDiv").fadeIn("slow");
				$("#pmReplyForm").fadeIn("slow");
				$("#ParentCommentID").val(cid);	
	        },
	        error: function (xhr, textStatus, errorThrown) 
			{
				console.log(errorThrown);
                alert("Could not save due to some technical error");
	        }
	    });				
	}
	else
	{
		document.getElementById("repliesDiv").innerHTML = "";
		$("#ParentCommentID").val("");	
		$("#repliesDiv").fadeOut("slow");	
		$("#pmReplyForm").fadeOut("slow");
	}
}
function showVideoReplyBox(vid,cid)
{
	if(document.getElementById("repliesDiv").style.display!="none")
	{
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=getVideoReplies&vid="+vid+"&cid="+cid;
	    $.ajax({
	        url: filename,
	        type: 'GET',
	        dataType: 'html',
	        beforeSend: function () {
	        },
	        success: function (data, textStatus, xhr) 
			{
				document.getElementById("repliesDiv").innerHTML = data;
				$("#repliesDiv").fadeIn("slow");
				$("#pmReplyForm").fadeIn("slow");
				$("#ParentCommentID").val(cid);	
                $("#videoid").val(vid);	
	        },
	        error: function (xhr, textStatus, errorThrown) 
			{
				console.log(errorThrown);
                alert("Could not save due to some technical error");
	        }
	    });				
	}
	else
	{
		document.getElementById("repliesDiv").innerHTML = "";
		$("#ParentCommentID").val("");	
		$("#repliesDiv").fadeOut("slow");	
		$("#pmReplyForm").fadeOut("slow");
	}
}
function checkReplyForm()
{
	if($("#reply_text").val()=="")
	{
		alert("Please enter reply.");
	}
	else
	{
		$("#videoid").val($("#vid").val());
        document.commentForm0.submit();
	}
}
function checkCommentForm()
{
	if($("#comment_text").val()=="")
	{
		alert("Please enter comment.");
	}
	else
	{
		document.commentForm.submit();
	}
}
function checkVideoCommentForm()
{
	if($("#comment_text").val()=="")
	{
		alert("Please enter comment.");
	}
	else
	{
		$("input[name='videoid']").val($("#vid").val());
        //document.getElementsByName('videoid').value=document.getElementById('vid').value;
        document.commentForm.submit();
	}
}
function closeTimer(ur)
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=closeTimer";
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			if(trim(data)=="SUCCESS!") window.location.href=ur;        
		},
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Some Error Occurred! Please try again");
        }
    });				
}
function closeLandingTimer(ur)
{
	var filename = "https://www.powersystemsdesign.com/ajax.php?action=closeLandingTimer";
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			if(trim(data)=="SUCCESS!") window.location.href=ur;        
		},
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Some Error Occurred! Please try again");
        }
    });				
}

function sharevideofb()
{
    console.log(document.getElementById("vid").value);
    var desc="Power Systems Design (PSD) empowers global innovation for the power electronic design engineering community.";
    var vid=document.getElementById("vid").value;
    var url= 'https://www.powersystemsdesign.com/shared-videos?vid='+vid;
   	var filename = "https://www.powersystemsdesign.com/ajax.php?action=shareVideo&vid="+vid;
    $.ajax({
        url: filename,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data, textStatus, xhr) 
		{
			console.log(data);
            var response=data.split('~');
            
            if(trim(response[0])=="Success")
            {
                postImgOnWall(response[1],'',desc,url,response[2]);
            }
            else
            {
                alert("Some Error Occurred! Please try again");
            }        
		},
        error: function (xhr, textStatus, errorThrown) 
		{
			alert("Some Error Occurred! Please try again");
        }
    });		
}

function viewVideo(vid,vfor){   
	document.getElementById("vvid").value = vid;
    if(vfor=="PSDTV")
    {
        $('#videoform').attr('action', 'psdtv');
    }else{
        $('#videoform').attr('action', 'german-language-psdtv');
    }
	document.videoform.submit();
}
//article download forgot password
function checkArticlesDownloadFP(){
	if(trim($("#FPEmail").val())=="")
    {
        alert("Email is required!");
    }
    else if(!validateEmail($("#FPEmail").val()))
	{
		alert("Please enter valid email address");
	}
	else
	{
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkArticleDownloadFP&"+$("#formArtFP").serialize();
        $.ajax({
            url: filename,
            type: 'GET',
            dataType: 'html',
            beforeSend: function () {
            },
            success: function (data, textStatus, xhr) 
    		{
                var dataArr = data.split("~");
    			document.getElementById("messageFPHead").innerHTML = dataArr[0];
    			document.getElementById("messageFPText").innerHTML = dataArr[1];
    			document.getElementById("messageFPDiv").style.display = "inline";
    			alert(dataArr[1]);
    			
            },
            error: function (xhr, textStatus, errorThrown) 
    		{
    			alert("Could not get your login credentials due to technical error");
            }
        });
	}
}
//media dile donwload forgot password
function checkMediaDownloadFP(){
	if(trim($("#FPMediaEmail").val())=="")
    {
        alert("Email is required!");
    }
    else if(!validateEmail($("#FPMediaEmail").val()))
	{
		alert("Please enter valid email address");
	}
	else
	{
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=checkMediaDownloadFP&"+$("#formMediaFP").serialize();
        $.ajax({
            url: filename,
            type: 'GET',
            dataType: 'html',
            beforeSend: function () {
            },
            success: function (data, textStatus, xhr) 
    		{
                var dataArr = data.split("~");
    			document.getElementById("messageFPMediaHead").innerHTML = dataArr[0];
    			document.getElementById("messageFPMediaText").innerHTML = dataArr[1];
    			document.getElementById("messageFPMediaDiv").style.display = "inline";
    			alert(dataArr[1]);
    			
            },
            error: function (xhr, textStatus, errorThrown) 
    		{
    			alert("Could not get your login credentials due to technical error");
            }
        });
	}
}
//aticles pdf reset passord
function showHideARTForm(act)
{
    if(act=="show")
    {
        $("#ArtForm").fadeIn("slow");
    }
    else
    {
        $("#ArtForm").fadeOut("slow");
    }
}
//reset password
function ResetArtDownloadPDF(){
	if(trim($("#ArtEmail").val())=="")
    {
    	
		alert("Email is required!");
		$("#ArtEmail").focus();
		return false;
        
    }
    else if(!validateEmail($("#ArtEmail").val()))
	{
		
		
		alert("Please enter valid email address");
		$("#ArtEmail").focus();
		return false;
	}else if(trim($("#ArtPassword").val())=="")
	{
		
		alert("Please enter Password");
		$("#ArtPassword").focus();
		return false;
		

	}else if(trim($("#ArtConfPassword").val())=="")
	{
		
		alert("Please enter Confirm password");
		$("#ArtConfPassword").focus();
		return false;
		
		
	}else if($("#ArtPassword").val()!=$("#ArtConfPassword").val())
	{
		
		alert("Both Passwords do not match");
		$("#ArtPassword").focus();
		return false;
	}
	else
	{
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=ResetArticleDownloadFP&"+$("#formArtDownloadFP").serialize();
        $.ajax({
            url: filename,
            type: 'GET',
            dataType: 'html',
            beforeSend: function () {
            },
            success: function (data, textStatus, xhr) 
    		{
                var dataArr = data.split("~");
    			document.getElementById("messageFPHeadArt").innerHTML = dataArr[0];
    			document.getElementById("messageFPTextArt").innerHTML = dataArr[1];

    			document.getElementById("messageFPArtDiv").style.display = "inline";
    			alert(dataArr[1]);
    			
            },
            error: function (xhr, textStatus, errorThrown) 
    		{
    			alert("Could not get your login credentials due to technical error");
            }
        });
	}
}
//reset password
function ResetMediaDownloadPDF(){
	if(trim($("#MediaEmail").val())=="")
    {
    	
		alert("Email is required yes!");
		$("#MediaEmail").focus();
		return false;
        
    }
    else if(!validateEmail($("#MediaEmail").val()))
	{
		
		
		alert("Please enter valid email address");
		$("#MediaEmail").focus();
		return false;
	}else if(trim($("#MediaPassword").val())=="")
	{
		
		alert("Please enter Password");
		$("#MediaPassword").focus();
		return false;
		

	}else if(trim($("#MediaConfPassword").val())=="")
	{
		
		alert("Please enter Confirm password");
		$("#MediaConfPassword").focus();
		return false;
		
		
	}else if($("#MediaPassword").val()!=$("#MediaConfPassword").val())
	{
		
		alert("Both Passwords do not match");
		$("#MediaPassword").focus();
		return false;
	}
	else
	{
		
		var filename = "https://www.powersystemsdesign.com/ajax.php?action=ResetMediaDownloadFP&"+$("#formMediaDownloadFP").serialize();
        $.ajax({
            url: filename,
            type: 'GET',
            dataType: 'html',
            beforeSend: function () {
            },
            success: function (data, textStatus, xhr) 
    		{
                var dataArr = data.split("~");
    			document.getElementById("messageMediaResHeadArt").innerHTML = dataArr[0];
    			document.getElementById("messageMediaResTextArt").innerHTML = dataArr[1];

    			document.getElementById("messageMediaResDiv").style.display = "inline";
    			alert(dataArr[1]);
    			
            },
            error: function (xhr, textStatus, errorThrown) 
    		{
    			alert("Could not get your login credentials due to technical error");
            }
        });
	}
}
function showHideLoginForm(act)
{
    if(act=="show")
    {
        $("#pm2598").fadeIn("slow");
        $("#pm2482").hide();
        $("#fpForm").hide();
        $("#ArtForm").hide();
    }
    else
    {
        $("#pm2598").fadeOut("slow");
    }
}
function showHideLoginMediaForm(act)
{
    if(act=="show")
    {
        $("#pm2598Media").fadeIn("slow");
        $("#pm2482Media").hide();
        $("#fpMediaForm").hide();
        $("#MediaResForm").hide();
    }
    else
    {
        $("#pm2598Media").fadeOut("slow");
    }
}
function showHideSignForm(act)
{
    if(act=="show")
    {
        $("#pm2482").fadeIn("slow");
        $("#pm2598").hide();
        $("#fpForm").hide();
        $("#ArtForm").hide();
    }
    else
    {
        $("#pm2482").fadeOut("slow");
    }
}
function showHideMediaSignForm(act)
{
    if(act=="show")
    {
        $("#pm2482Media").fadeIn("slow");
        $("#pm2598Media").hide();
        $("#fpMediaForm").hide();
        $("#MediaResForm").hide();
    }
    else
    {
        $("#pm2482").fadeOut("slow");
    }
}
function showHideMediaSignForm(act)
{
    if(act=="show")
    {
        $("#pm2482Media").fadeIn("slow");
        $("#pm2598Media").hide();
        $("#fpMediaForm").hide();
        $("#MediaResForm").hide();
    }
    else
    {
        $("#pm2482Media").fadeOut("slow");
    }
}
function showHideForgotpassForm(act)
{
    if(act=="show")
    {
        $("#fpForm").fadeIn("slow");
        $("#pm2598").hide();
        $("#pm2482").hide();
        $("#ArtForm").hide();
    }
    else
    {
        $("#fpForm").fadeOut("slow");
    }
}
function showHideMediaForgotpassForm(act){
	if(act=="show")
    {
        $("#fpMediaForm").fadeIn("slow");
        $("#pm2598Media").hide();
        $("#pm2482Media").hide();
        $("#MediaResForm").hide();
    }
    else
    {
        $("#fpMediaForm").fadeOut("slow");
    }
}
function showHideARTForm(act)
{
    if(act=="show")
    {
        $("#ArtForm").fadeIn("slow");
        $("#pm2598").hide();
        $("#pm2482").hide();
        $("#fpForm").hide();
    }
    else
    {
        $("#ArtForm").fadeOut("slow");
    }
}
function showHideMediaResForm(act){
	if(act=="show")
    {
        $("#MediaResForm").fadeIn("slow");
        $("#pm2598Media").hide();
        $("#pm2482Media").hide();
        $("#fpMediaForm").hide();
    }
    else
    {
        $("#MediaResForm").fadeOut("slow");
    }
}
