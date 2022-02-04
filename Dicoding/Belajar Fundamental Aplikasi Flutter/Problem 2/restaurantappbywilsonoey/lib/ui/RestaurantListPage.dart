import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:restaurantappbywilsonoey/data/api/api_service.dart';
import 'package:restaurantappbywilsonoey/data/model/Provider/RestaurantProvider.dart';
import 'package:restaurantappbywilsonoey/data/model/Restaurant/ListRestaurant.dart';
import 'package:restaurantappbywilsonoey/widgets/card_article.dart';
import 'package:restaurantappbywilsonoey/widgets/platform_widget.dart';
import 'RestaurantSearchPage.dart';

class RestaurantListPage extends StatefulWidget {
  @override
  _RestaurantListPageState createState() => _RestaurantListPageState();
}

class _RestaurantListPageState extends State<RestaurantListPage> {
  late Future<ListRestaurant> _restaurantlist;

  @override
  void initState() {
    super.initState();
    _restaurantlist = ApiService().getListRestaurant();
  }

  Widget _buildList(BuildContext context) {
    return Consumer<RestaurantProvider>(
      builder: (context, state, _) {
        if (state.state == ResultState.Loading) {
          return Center(child: CircularProgressIndicator());
        } else if (state.state == ResultState.HasData) {
          return ListView.builder(
            shrinkWrap: true,
            itemCount: state.result.restaurants.length,
            itemBuilder: (context, index) {
              var article = state.result.restaurants[index];
              return CardArticle(article: article);
            },
          );
        } else if (state.state == ResultState.NoData) {
          return Center(child: Text('Gagal memuat data, silahkan periksa koneksi internet Anda'));
        } else if (state.state == ResultState.Error) {
          return Center(child: Text('Eror memuat data'));
        } else {
          return Center(child: Text(''));
        }
      },
    );
  }

  Widget _buildAndroid(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Restaurant App'),
        actions: [IconButton(icon: Icon(Icons.search), onPressed: () {
          showSearch(context: context, delegate: SearchPage());
        })],
      ),
      body: _buildList(context),
    );
  }

  Widget _buildIos(BuildContext context) {
    return CupertinoPageScaffold(child: _buildAndroid(context));
  }

  @override
  Widget build(BuildContext context) {
    return PlatformWidget(
      androidBuilder: _buildAndroid,
      iosBuilder: _buildIos,
    );
  }
}

