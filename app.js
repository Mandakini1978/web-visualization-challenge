const file = "samples.json";
let myArray = [];
let myArray1 = [];
let myArray2 = [];
let myArray3 = [];
let meta_Array = [];
let subject_id = [];
let sample_Array = [];
let total_samples = 0;
// Fetch the JSON data and console log it
d3.json(file).then(function(data) {
  //console.log("samples",data.samples);
  //console.log(data.samples[0].otu_level);
  //console.log(data.samples[0].otu_ids);
  //console.log(data.samples[0].sample_values);

  total_samples = data.samples.length;
  
  
  for (let i=0; i<total_samples; i++)
  {
    sample_Array.push(data.samples[i]);
    //console.log("Sample_Array",sample_Array[i]);
    meta_Array.push(data.metadata[i]); 
    //console.log("meta_Array",meta_Array[i]);
     myArray.push(data.samples[i].id);
    //console.log("id",data.samples[i].id);
    myArray1.push(data.samples[i].otu_ids);
    //console.log("otu_id",data.samples[i].otu_ids);
    myArray2.push(data.samples[i].otu_labels);
    //console.log("otu_labels",data.samples[i].otu_labels);
    myArray3.push(data.samples[i].sample_values);
    //console.log("sample_values",data.samples[i].sample_values);
  }
 for(let i=0;i<=((data.names).length);i++)
      subject_id.push(data.names[i]);
     // console.log("subject_id",subject_id);

  let selector = d3.select("#selDataset");
  let sampleNames = subject_id;
            
    sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });

  //console.log("x:",myArray1[0]);
  //console.log("y:",myArray3[0]);
  // Trace for the Greek Data
  
////////////////////////////////////////////////////////

d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  var x_data = [];
  var y_data = [];
  var name_data = [];

console.log("total_samples",total_samples);

for(i=0;i<total_samples;i++)
{
  
  if (dataset == sample_Array[i].id) 
  {  
    var subject_data = [];
    subject_data = Object.keys(sample_Array[i]).map(v => new Array(v, sample_Array[i][v]));
   /* let new_list = subject_data.map(function(obj) {
      return {
        otu_ids: obj.otu_ids,
        sample_values: obj.sample_values,
        otu_labels: obj.otu_labels
      }
    });

    console.log("new_list",new_list);
    
   // console.log("subject_data",subject_data)
   // subject_data_flat = subject_data.flat();
   // let sortedSampledata = sample_Array[i].sample_values.sort((a, b) => b - a);
    //console.log("sortedSampledata",sortedSampledata);
    //console.log("subject_data flat",subject_data_flat);
    //console.log("subject_data flat lenth",subject_data_flat[3].length);
    
   
    var sample_data_array = [[],[],[]];
    
      sample_data_array[0].push(subject_data.otu_ids);
      sample_data_array[1].push(subject_data.sample_values);
      sample_data_array[2].push(subject_data.otu_labels);
    
    console.log("sample_data_array",sample_data_array);
   
    var top_ten_data_array = [[],[],[]];
     for(i=0;i<10;i++)
     {
      
      top_ten_data_array[0].push(sample_data_array[0][i]);
      top_ten_data_array[1].push(sample_data_array[1][i]);
      top_ten_data_array[2].push(sample_data_array[2][i]);
     }

     console.log("top_ten_data_array",top_ten_data_array);
    // console.log("y_data",y_data);

    */
    var id_data = [];
    //id_data = Object.keys(sample_Array[i].otu_ids).map(v => new Array(sample_Array[i].otu_ids[v]));
    for(j=0;j<sample_Array[i].otu_ids.length;j++) 
    {
      id_data[j] = "OTU " + sample_Array[i].otu_ids[j];
    }
    console.log("id_data",id_data);

    x_data = sample_Array[i].sample_values;
    y_data = id_data;
    name_data = sample_Array[i].otu_labels;
    var weekf = meta_Array[i].wfreq;

    //console.log("label",name_data);
    //var age = "age:" 
    //var bbtype: "I"
    //var ethnicity: "Caucasian"
    //var gender: "M"
    //var id: 960
    //var location: "Lexington/NC"
    //var wfreq: 7
    ///////////////////////////////////////////////////////////
    // Select the text of an HTML element

// Modify the text of an HTML element
d3.select("#sample-metadata-id").text("id: "+ meta_Array[i].id);
d3.select("#sample-metadata-age").text("age: " + meta_Array[i].age);
d3.select("#sample-metadata-bbtype").text("bbtype: " + meta_Array[i].bbtype);
d3.select("#sample-metadata-ethnicity").text("ethnicity: " + meta_Array[i].ethnicity);
d3.select("#sample-metadata-gender").text("gender: "+meta_Array[i].gender);
d3.select("#sample-metadata-location").text("location: "+meta_Array[i].location);
d3.select("#sample-metadata-wfreq").text("wfreq: "+meta_Array[i].wfreq);

    ///////////////////////////////////////////////////////////
  }
}
   // Call function to update the chart
  updatePlotly(x_data,y_data,name_data,weekf);
}

// Update the restyled plot's values
function updatePlotly(newdata_x,newdata_y,newname_data,new_wf) {
  console.log(newname_data);
  //Plotly.restyle("plot", "values", [newdata]);
  let trace1 = {
    x: newdata_x,
    y: newdata_y,
    text: newname_data,
    type: "bar",
    orientation : "h"
  };

// Data trace array
let traceData = [trace1];

// Apply the group barmode to the layout
let layout = {
  title: "Test"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);

///////////////////////////////////////////////////////////////////
var trace2 = {
  x: newdata_y,
  y: newdata_x,
  mode: 'markers',
  marker: {
    color: newdata_x,
   // opacity: [1, 0.8, 0.6, 0.4],
    size: newdata_x
  }
};

var data1 = [trace2];

var layout1 = {
  title: 'Marker Size and Color',
  showlegend: false,
  height: 600,
  width: 1200
};

Plotly.newPlot("bubble", data1, layout1);
  


///////////////////////////////////////////////////////////////////
var data3 = [
  
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: new_wf,
    title: { text: "Scrubs per week" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 10 },
    gauge: { axis: { range: [0, 10] } }
  }
];

var layout3 = { width: 600, height: 400 };
Plotly.newPlot('gauge', data3, layout3);



}


});
  
  





