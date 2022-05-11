
function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }


$(document).ready(async function() {
    $.fn.dataTable.ext.errMode = 'none';
    var ridersdataset = new Array();
   
   
    //  rider table data
        ridersdataset  =  await   firestore.collection('riders').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id)
                var holdData = doc.data()
                holdData.id=doc.id
                ridersdataset.push(holdData);
            });
            return ridersdataset
        });

         //buyer firestore

    var  buyerdataset = new Array();
    buyerdataset = await firestore.collection('Users').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            buyerdataset.push(doc.data());
        });
        return buyerdataset
    });


    //buyer firesit
    var deliveriesdataset =[]
    deliveriesdataset =  await  firestore.collection('Purchase').get().then(function(querySnapshot) {
            console.log(querySnapshot)
            querySnapshot.forEach( function(doc){
            var holdData = doc.data()
              holdData.id = doc.id;
               deliveriesdataset.push(holdData);
            });
            // console.log(deliveriesdataset)
            return   deliveriesdataset
        });    



    console.log(ridersdataset)
    var rider =$('#riders').DataTable( {
        dom: 'Bfrtip',
        scrollY:'50vh',
        scrollX:true,
        columns: [
            { title: "Name" ,
                data:'null',
                render:function(data,type,row){
                    return row.firstName+" "+row.lastName
                }},
            { title: "Status (Available)",
                data: 'status'},
            {
                title: "Verify",
                data: 'verify',
                defaultContent: '',
            },
            { title: "Birthdate",
                data:'birthday' },
            { title: "Email",
                data:'email'},
            { title: "Vehicle Type",
              data:'vehicleType'},
        ]
    });
   
    rider.clear().rows.add(ridersdataset).draw();
    var riderId=''
    var cellrider;
    var chooseverify='';
    $('#riders tbody').on( 'click', 'tr', function () {
        console.log(rider.row( this ).data());
        document.getElementById("idnumber").innerHTML =  rider.row( this ).data()["Id Number"]
        document.getElementById("issuedate").innerHTML = rider.row( this ).data()["Issue Date"]
        document.getElementById('licencesplate').innerHTML =  rider.row( this ).data()["licencesPlate"]
        document.getElementById('verify').value =  rider.row( this ).data()["verify"]
        document.getElementById('phonenumber').innerHTML =  rider.row( this ).data()["mobileNumber"]
        riderId= rider.row( this ).data()["id"]

        var img = document.createElement("img1");
        var src = document.getElementById("filesshow");
        cellrider = rider.row(this).index();
       
        $('#verify').change(function() {
            var data =$(this).val()// will work here
            chooseverify=data;
        });
       
        // $("#rider_form").submit(function(){
        //     firestore.collection("riders").doc(riderId).update({verify:chooseverify});
        //     console.log('choose '+chooseverify);
        //     console.log(cellrider)
        //     rider.cell({row:cellrider, column:2}).data( chooseverify).draw();
        //     alert("Submit!");
        //     return false;
        // });
    

        var Workin = false;

        $("#rider_form").submit(function()
        {
            if(Workin) return false;
            Workin =true;
            firestore.collection("riders").doc(riderId).update({verify:chooseverify});
            console.log('choose '+chooseverify);
            console.log(cellrider)
            rider.cell({row:cellrider, column:2}).data( chooseverify).draw();
            alert("Submit!");
           
            Workin = false;
            $('#detail').modal('hide');
        }); 

        $('#detail').modal('toggle');
    });

   
  
   

    var buyertable=$('#buyer').DataTable( {
        dom: 'Bfrtip',
        scrollY:'70vh',
        scrollX:true,
        columns: [
            {
                title:"Message",
                data:'',
                render:function(data,type,row){
                    return '<button class="notification-btn" onclick="openForm()"><i class="fa fa-bell-o"></i></button>'
                }
            },
            { title: "Name" ,
              data:'first_name',},
            { title: "Gender",
                data: 'gender'},
            { title: "Birthdate",
                data:'birth_date' },
            { title: "Address",
                data:'barangay'},
        ]
    });
   
    buyertable.clear().rows.add(buyerdataset).draw();
    //search 
    $( ".search-btn" ).click(function() {
        var search=$('.search').val()
        console.log(search)
        buyertable.search(search).draw();
        rider.search(search).draw();
      });
      
    var token='';
    $('#buyer tbody').on( 'click', 'tr', function () {
        console.log(buyertable.row( this ).index() )
        console.log( buyertable.row( this ).data().token);
    var familyname=''
    var familygender=''
    var diataryfamily=''
    var mydiatary=''
    console.log(buyertable.row( this ).data()["family"])
    if(buyertable.row( this ).data()["family"]!=null){
        buyertable.row( this ).data()["family"].map((e)=>familyname += e.first_name!=undefined?"<li>"+e.first_name+"</li>":"NONE")
        buyertable.row( this ).data()["family"].map((e)=>familygender += e.gender!=undefined?"<li>"+e.gender+"</li>":"<li>"+"NONE"+"</li>")
        buyertable.row( this ).data()["family"].map((e)=> diataryfamily += e.medical!=undefined?"<li>"+e.medical+"</li>":"<li>"+"NONE"+"</li>")
       if(buyertable.row( this ).data()["medical"]!=null){
        buyertable.row( this ).data()["medical"].map((e)=>mydiatary+="<li>"+e+"</li>")
       }
        document.getElementById("listbuyername").innerHTML = familyname
        document.getElementById("buyerfamilygender").innerHTML = familygender
        document.getElementById("familydiataryrestriction").innerHTML = diataryfamily     
        document.getElementById("mydiatary").innerHTML= mydiatary
    }else{
        document.getElementById("listbuyername").innerHTML ="NONE"
        document.getElementById("buyerfamilygender").innerHTML = "NONE"
        document.getElementById("familydiataryrestriction").innerHTML = "NONE"   
        document.getElementById("mydiatary").innerHTML= "NONE"}
        $('#modal_buyer').modal('toggle');
});

    $('#buyer tbody').on( 'click', 'fa-bell-o', function () {
        console.log( buyertable.row( this ).data().token)
        token = buyertable.row( this ).data().token
    });

    
  
   console.log(deliveriesdataset)
    var deliveries = $('#order_details').DataTable( {
        dom: 'Bfrtip',
        scrollY:'70vh',
        scrollX:true,
        columns: [
            { title: "Order No." ,
                data:'id'},
                {title: "Buyer",
                data:'name'},
            { title: "Status",
                data:'',
                render:function(data,type,row){
                    console.log("status "+row.recieve)
                    var status=''
                    if(row.recieve){
                        status= "received"
                    }else{
                        status="to ship"
                    }
                return status
                }},
           
            {title: "Rider",
              data:'rider' },
            { title: "Grocery Store",
              data:'grocery_Store' },
            { title:"Delivery Address",
              data:'address' },
            // {title:"Mode of Payment",
            //   data:'paidType'},
            // {title:"Purchase Items",
            //   data:'',
            //   render:function(data,type,row){
            //    var items=[];
            //    console.log(row.list_item)
            //     row.list_item.map((e)=>items.push("<li>"+e.PRODUCTNAME+"</li>") )
            //   console.log(items)
            //     return"<ul>"+items+"</ul>"
            //   }},
            // {title:"Sub Total",
            //   data:'total'},
            // {title:"Shipping Fee",
            //   data:'shippingfee'},
            // {title:"Order Total(total price)",
            //   data:'',
            // render:function(data,type,row){
            //     return row.shippingfee+row.total;
            // }}
        ]
    } );
     deliveries.clear().rows.add(deliveriesdataset).draw();
  
     $('#order_details tbody').on( 'click', 'tr', function () {
        deliveries.row( this ).data()
       

        document.getElementById("modeofpayment").innerHTML = deliveries.row( this ).data()['paidType']
        document.getElementById("subtotal").innerHTML ='₱ ' + deliveries.row( this ).data()['total']
        document.getElementById("shipping_fee").innerHTML ='₱ '+ deliveries.row( this ).data()['shippingfee']
        document.getElementById("totaprice").innerHTML = '₱ '+ (parseFloat( deliveries.row( this ).data()['shippingfee']) + parseFloat(deliveries.row( this ).data()['total'])).toString()
        
        console.log( deliveries.row( this ).data()['list_item'])
        var items='';
        deliveries.row( this ).data()['list_item'].map((e)=>items += "<li>"+e.PRODUCTNAME+"</li>") 
        console.log(items)
        document.getElementById("purchaseitems").innerHTML=items
        $('#modal_order').modal('toggle');
     })

    $('#formMessage').submit(function(){
        console.log($('#title').val)
        $.post( "/api/notification/sendToAll", { token:token,title:$('#title').val(),message:$('#msg').val()} );
      
    })

});
