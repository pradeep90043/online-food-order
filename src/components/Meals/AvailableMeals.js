import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItems/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  useEffect(() => {

    const fetchMeal = async () => {
      const response = await fetch(
        "https://food-order-e8fa2-default-rtdb.firebaseio.com/meals.json"
      );
      const data = await response.json();
      console.log(data);

      const loadedData = []

      for(const key in data){
        loadedData.push({
          id:key,
          name:data[key].name,
          description:data[key].description,
          price:data[key].price
        }
        )
        
      }
      console.log(loadedData);
      setMeals(loadedData)
    };
    fetchMeal()


  }, []);
 
console.log(meals);
  const mealList = meals.map((meal) => {
    return (
      <div key={meal.id}>
        {
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            price={meal.price}
            description={meal.description}
          />
        }
      </div>
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
