/**
 * Created by hbzhang on 5/8/17.
 */

angular.module('mean.page').controller('PdfExportController', ['$scope','Global',
    'Restangular','Program','$location','formtoaster','LocalStorageData','Users','UserinformationHelper',
    function($scope,Global,Restangular,Program
        ,$location,formtoaster,LocalStorageData,Users,UserinformationHelper) {
        $scope.global = Global;


        $scope.error_pop = function(){
            formtoaster.now.error('There is no form submission yet, please fill out forms and submit');
        };



    $scope.export = function(){

    if($scope.employeeregistered[0].length === 0){
        $scope.error_pop();
        return;
    }

    /* var imagedata;
     html2canvas(document.getElementById('exportthis'), {
     onrendered: function (canvas) {
     imagedata = canvas.toDataURL();
     var docDefinition = {
     pageSize: 'A5',
     content: [{
     image: imagedata
     }]
     };
     pdfMake.createPdf(docDefinition).download("test.pdf");
     }
     });*/

    //https://github.com/bpampuch/pdfmake/issues/24

    var headertext = 'Division of Student Affairs at Virginia Tech Faculty Evaluation Report';

    var headertext1 = 'This tool is used for faculty and supervisors to plan annual performance and ' +
                'professional development goals using ACPA/NASPA competencies and industry specific competencies ' +
                'related to the faculty member’s field of expertise. Additional faculty performance management ' +
                'resources are available at the DSA HR website at http://www.staff.dsa.vt.edu/humanresources/employeeperformance.php. ' +
                'The following are the phases for completing what is referred to as the PACE proces';

   var headertext2 = 'Planning : The shaded portions of Sections A, B, and C are ' +
                'completed by the faculty member at the beginning of the performance cycle to establish' +
                ' goals and professional development plans. (Note: For new faculty, this should be ' +
                'completed approximately 30 days after their start date.) ' +
                'Goals should support departmental and the Division of Student Affairs’ strategic' +
                ' goals found at http://www.dsa.vt.edu/about/.';
   var headertext3 = 'Affirmation : The faculty member and the faculty member’s ' +
                'supervisor meet to review the performance plan and negotiate any changes, expectations, and/or resources ' +
                'needed to achieve the plan in Sections A, B, and C. Signatures should be completed in Section D.';

   var headertext4 = 'Communication : The faculty member and their supervisor should maintain communication regarding the progress' +
                ' and/or needed changes to performance goals and the professional development plan throughout the year.';

   var headertext5 = 'Evaluation : This phase is completed in five steps at the end of the performance cycle and includes an ' +
                'overall review of the faculty member’s accomplishments and progress towards the selected goals.';

   var pinfor0 = 'Faculty Member Name';
   var pinfor1 = 'Faculty Member Email';
   var pinfor2 = 'Faculty Member Dept/Org';
   var pinfor3 = 'Faculty Member Work Location';
   var pinfor4 = 'Supervisor Name';
   var pinfor5 = 'Supervisor Title';
   var pinfor6 = 'Review Year Cycle';

   var cell1 = 'Outstanding performance that considerably and consistently exceeds expectations. Accomplishments were made in unexpected areas.';
   var cell2 = 'Solid performance. Consistently meets expectations and at times, exceeds expectations. Goals were achieved at, or at times, more than established standards.';
   var cell3 = 'Partially meets performance expectations but needs improvement. Improvement is achievable. Requires greater than usual time and attention by supervisor.';
   var cell4 = 'Performance is consistently below expectations. Requires significant time and attention by the supervisor.';


    //get user information
    var getuserinformation = function(){
            $scope.userinformation = UserinformationHelper.getuserinformation();
            $scope.supervisorname =  UserinformationHelper.getsupervisorname();
            $scope.supervisortitle = UserinformationHelper.getsupervisortitle();
            var today = new Date();
            $scope.thisyear = today.getFullYear();
     }();

        //Instructions of the report
   function tableinstructions() {
        return {
            table: {
                headerRows: 1,
                body: buildTableInstruction(['Exceeds Expectations','Strong','Needs Improvement','Unsatisfactory'])
            }

        };
   }

   function buildTableInstruction(columns) {
              var body = [];

              body.push(columns);

              var dataRow = [cell1, cell2, cell3, cell4];

              body.push(dataRow);

              return body;
   }

  //Personal Information of the report
    function tablepersonal(columns) {
        return {
            table: {
                headerRows: 1,
                body: buildPersonalTableBody(columns)
            }
            // to treat a paragraph as a bulleted list, set an array of items under the ul key
        };
    }

    function buildPersonalTableBody(columns) {
        var body = [];

        body.push(columns);

        var p0, p1, p2, p3, p4, p5, p6;

        p0= $scope.userinformation.attributes[0].Name;
        p1= $scope.userinformation.attributes[0].Email;

        if($scope.userinformation.attributes[0].Department)
         p2= $scope.userinformation.attributes[0].Department;
        else
         p2 = "";

        if($scope.userinformation.attributes[0].Location)
         p3= $scope.userinformation.attributes[0].Location;
        else
         p3 = "";

        if($scope.supervisorname)
         p4= $scope.supervisorname;
        else
         p4= "";

        if($scope.supervisortitle)
         p5= $scope.supervisortitle;
        else
         p5 = "";

        p6= $scope.thisyear;

        var dataRow = [p0,p1,p2,p3,p4,p5,p6];

        body.push(dataRow);

        return body;
    }

    //Main Body of the report
    function jsonConcat(o1, o2) {
            for (var key in o2) {

                o1[key] = o2[key];
            }
            return o1;
    }

    var headline ={};

    function table(data, columns) {

        var tableobj = [];
        data.forEach(function(forms) {
            var newtable = buildSubTable(forms, columns);
            tableobj = tableobj.concat(headline);
            tableobj = tableobj.concat({text: '', style: 'header' ,margin: [ 5, 5, 5, 5 ]});
            tableobj = tableobj.concat(newtable);
            tableobj = tableobj.concat({text: '', style: 'header' ,margin: [ 5, 5, 5, 5 ]});
            //tableobj = Object.assign(tableobj, newtable);
            //tableobj = jsonConcat(tableobj,newtable);
        });

        return tableobj;
    }

    function buildSubTable(data, columns) {

            return {
                table: {
                    headerRows: 1,
                    widths: ['100%'],
                    body: buildTableBody(data, columns)
                }

            };
    }

    function buildTableBody(data, columns) {
        var body = [];
        var index = -1;
        data.forEach(function(form) {

                var dataRow = [];

                index+=1;

                if(Array.isArray(form) && form.length > 0){
                    form.forEach(function(item) {
                        if(item && item['value'].toString().length > 0)
                        dataRow.push([{ text: item['label'].toString() + ' ' + item['value'].toString(), bold: true }]);
                    })

                }
                else{
                    if(form['label'].toString()==='Reviewer' || form['label'].toString()==='Employee'|| form['label'].toString()==='Supervisor' )
                        dataRow=[{text: item['label'].toString() + ' ' + form['value'].toString(), bold: true }];
                    else{
                        if(index === 0){
                            dataRow=[{ text: form['label'].toString() + ' ' +form['value'].toString(),style: 'header'}];
                        }
                        else{
                            if(form['component'] === 'label')
                                dataRow=[{ text: form['label'].toString() + ' ' +form['value'].toString(),style: 'subheader' }];
                            else
                                dataRow=[{ text: form['label'].toString() + ': ' +form['value'].toString()}];
                        }
                    }

                }


               if(index === 0){
                   headline = dataRow;
                   //body.push(columns)
               }
               if(index !== 0){
                body.push(dataRow);
               }
         })

        return body;
    }


    var docDefinition = {
        header:  {
            columns: [
                { text: headertext, alignment: 'center', style: 'header', margin: [ 5, 10, 5, 10 ] }

            ]
        },
        footer: {
            columns: [
                { text: 'Faculty Evaluation Report', alignment: 'center' }
            ]
        },
        content: [
            [ {text: 'Personal Information and Instructions', style: 'header' ,margin: [ 5, 10, 5, 10 ]}],
            tablepersonal([pinfor0,pinfor1,pinfor2,pinfor3,pinfor4,pinfor5,pinfor6]),
            [ {text: headertext1  ,margin: [ 5, 10, 5, 10 ]}],
            [ {text: headertext2  ,margin: [ 5, 10, 5, 10 ]}],
            [ {text: headertext3  ,margin: [ 5, 10, 5, 10 ]}],
            [ {text: headertext4  ,margin: [ 5, 10, 5, 10 ]}],
            [ {text: headertext5  ,margin: [ 5, 10, 5, 10 ]}],
            tableinstructions(),
            [ {text: '', style: 'tableHeader' }],
            [ {text: '', style: 'header' ,margin: [ 5, 40, 5, 40 ]}],
            // to treat a paragraph as a bulleted list, set an array of items under the ul key
            [ {text: '', margin: [ 5, 10, 5, 10 ],pagepageBreak: 'after'}],
            table($scope.employeeregistered, ['Submission'])

        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                alignment: 'center',
                fillColor: 'gray'
            },
            anotherStyle: {
                italics: true,
                alignment: 'right'
            }
        }
    };

    pdfMake.createPdf(docDefinition).download("Faculty Evaluation Report.pdf");

}



    }]);
