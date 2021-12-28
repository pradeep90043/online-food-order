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
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(
        "https://food-order-e8fa2-default-rtdb.fiffffhgfrebaseio.com/meal.json"
      );
      console.log(response, "rees");
      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const data = await response.json();
      // console.log(data);

      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      console.log(loadedData);
      setMeals(loadedData);
      setIsLoading(false);
    };
    fetchMeal().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  if (httpError) {
    return (
      <section className={classes.httpError}>
        <p>{httpError}</p>
      </section>
    );
  }
  console.log(httpError);

  if (isLoading) {
    return (
      <section className={classes.isLoading}>
        <p> loading...</p>
      </section>
    );
  }

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
