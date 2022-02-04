import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:restaurantappbywilsonoey/data/api/api_service.dart';
import 'package:restaurantappbywilsonoey/data/model/Restaurant/ListRestaurant.dart';

class RestaurantDetailPage extends StatelessWidget {
  static const routeName = '/restaurant_detail';

  final ListRestaurantItem restaurantdetail;

  const RestaurantDetailPage({required this.restaurantdetail});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('News App'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Hero(
              tag: restaurantdetail.name,
              child: Text(
                restaurantdetail.name,
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
              )
            ),
            Padding(
              padding: EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Image.network(ApiService.baseUrlImage + restaurantdetail.pictureId),
                  Text(
                    restaurantdetail.description,
                    style: Theme.of(context).textTheme.headline5,
                  ),
                  Divider(color: Colors.grey),
                  Text(
                    'City : ${restaurantdetail.city}',
                    style: Theme.of(context).textTheme.headline6,
                  ),
                  SizedBox(height: 10),
                  Text(
                    'Rating : ${restaurantdetail.rating}',
                    style: Theme.of(context).textTheme.headline6,
                  ),
                  Divider(color: Colors.grey),
                ],
              ),
            ),

          ],
        ),
      ),
    );
  }

}

