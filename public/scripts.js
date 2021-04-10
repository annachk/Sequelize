function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

async function getMeals() {
    console.log('data request');
    const diningRequest = await fetch('/api/wholeMeal');
    const diningData = await diningRequest.json();
    return diningData;
}

async function windowActions() {
    console.log('loaded window');
    const results = await getMeals();
    const meals = results.data;

    //Chart
    const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let calories_array = []
    let serving_array = []
    let cholesterol_array = []

    const selectedMeals = mealArray.map((element) => {
        const random = getRandomIntInclusive(0, meals.length - 1);
        meals_random = meals[random]

        calories_array.push({calories_k: meals_random["calories"], name_k: meals_random["meal_name"]})
        serving_array.push({serving_k: meals_random["serving_size"], name_k: meals_random["meal_name"]})
        cholesterol_array.push({cholesterol_k: meals_random["cholesterol"], name_k: meals_random["meal_name"]})

        return meals_random;
    });
    console.table(selectedMeals);
    
    console.log(calories_array)
    console.log(serving_array)
    console.log(cholesterol_array)
    
    var chart = new CanvasJS.Chart("chartContainer",{
        animationEnabled: true,
        title:{
            text: "Meals x Macros"
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "stackedBar",
            name: "calories",
            showInLegend: "true",
            dataPoints: [{y: calories_array[0]["calories_k"], label: calories_array[0]["name_k"]},
                {y: calories_array[1]["calories_k"], label: calories_array[1]["name_k"]},
                {y: calories_array[2]["calories_k"], label: calories_array[2]["name_k"]},
                {y: calories_array[3]["calories_k"], label: calories_array[3]["name_k"]},
                {y: calories_array[4]["calories_k"], label: calories_array[4]["name_k"]},
                {y: calories_array[5]["calories_k"], label: calories_array[5]["name_k"]},
                {y: calories_array[6]["calories_k"], label: calories_array[6]["name_k"]},
                {y: calories_array[7]["calories_k"], label: calories_array[7]["name_k"]},
                {y: calories_array[8]["calories_k"], label: calories_array[8]["name_k"]},
                {y: calories_array[9]["calories_k"], label: calories_array[9]["name_k"]}
            ]
        },
        {
            type: "stackedBar",
            name: "serving_size",
            showInLegend: "true",
            dataPoints: [{y: serving_array[0]["serving_k"], label: serving_array[0]["name_k"]},
            {y: serving_array[1]["serving_k"], label: serving_array[1]["name_k"]},
            {y: serving_array[2]["serving_k"], label: serving_array[2]["name_k"]},
            {y: serving_array[3]["serving_k"], label: serving_array[3]["name_k"]},
            {y: serving_array[4]["serving_k"], label: serving_array[4]["name_k"]},
            {y: serving_array[5]["serving_k"], label: serving_array[5]["name_k"]},
            {y: serving_array[6]["serving_k"], label: serving_array[6]["name_k"]},
            {y: serving_array[7]["serving_k"], label: serving_array[7]["name_k"]},
            {y: serving_array[8]["serving_k"], label: serving_array[8]["name_k"]},
            {y: serving_array[9]["serving_k"], label: serving_array[9]["name_k"]}
            ]
        },
        {
            type: "stackedBar",
            name: "cholesterol",
            showInLegend: "true",
            dataPoints: [{y: cholesterol_array[0]["cholesterol_k"], label: cholesterol_array[0]["name_k"]},
            {y: cholesterol_array[1]["cholesterol_k"], label: cholesterol_array[1]["name_k"]},
            {y: cholesterol_array[2]["cholesterol_k"], label: cholesterol_array[2]["name_k"]},
            {y: cholesterol_array[3]["cholesterol_k"], label: cholesterol_array[3]["name_k"]},
            {y: cholesterol_array[4]["cholesterol_k"], label: cholesterol_array[4]["name_k"]},
            {y: cholesterol_array[5]["cholesterol_k"], label: cholesterol_array[5]["name_k"]},
            {y: cholesterol_array[6]["cholesterol_k"], label: cholesterol_array[6]["name_k"]},
            {y: cholesterol_array[7]["cholesterol_k"], label: cholesterol_array[7]["name_k"]},
            {y: cholesterol_array[8]["cholesterol_k"], label: cholesterol_array[8]["name_k"]},
            {y: cholesterol_array[9]["cholesterol_k"], label: cholesterol_array[9]["name_k"]}
            ]
        }
    ]
    });
    
    chart.render();
    
    function toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
}

window.onload = windowActions;
