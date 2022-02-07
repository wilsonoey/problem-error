import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:restaurantappbywilsonoey/data/api/api_service.dart';
import 'package:restaurantappbywilsonoey/data/model/Provider/RestaurantDetailProvider.dart';

class RestaurantDetailPage extends StatelessWidget {
  static const routeName = '/restaurant_detail';

  final RestaurantDetailProvider restaurantdetail;
  const RestaurantDetailPage({required this.restaurantdetail});
  @override
  Widget build(BuildContext context) {
    return Consumer<RestaurantDetailProvider>(
      builder: (context, state, _) {
        if (state.state == ResultState.Loading) {
          return Center(child: CircularProgressIndicator());
        } else if (state.state == ResultState.HasData) {
          return Scaffold(
            appBar: AppBar(
              title: Text('Restaurant App'),
            ),
            body: SingleChildScrollView(
              child: Column(
                children: [
                  Hero(
                      tag: state.result.restaurant.name,
                      child: Text(
                        state.result.restaurant.name,
                        style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
                      )
                  ),
                  Padding(
                    padding: EdgeInsets.all(10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Image.network(ApiService.baseUrlImage + state.result.restaurant.pictureId),
                        Text(
                          state.result.restaurant.description,
                          style: Theme.of(context).textTheme.headline5,
                        ),
                        Divider(color: Colors.grey),
                        Text(
                          'City : ${state.result.restaurant.city}',
                          style: Theme.of(context).textTheme.headline6,
                        ),
                        SizedBox(height: 10),
                        Text(
                          'Rating : ${state.result.restaurant.rating}',
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
        } else if (state.state == ResultState.NoData) {
          return Center(child: Text('Eror memuat data'));
        } else if (state.state == ResultState.Error) {
          return Center(child: Text('Gagal memuat data, silahkan periksa koneksi internet Anda'));
        } else {
          return Center(child: Text(''));
        }
      },
    );

  }

}

