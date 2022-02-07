import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:restaurantappbywilsonoey/data/api/api_service.dart';
import 'package:restaurantappbywilsonoey/data/model/Provider/RestaurantSearchProvider.dart';
import 'package:restaurantappbywilsonoey/data/model/Restaurant/ListRestaurant.dart';
import 'package:restaurantappbywilsonoey/ui/RestaurantListPage.dart';
import 'package:restaurantappbywilsonoey/widgets/card_article.dart';

class SearchPage extends SearchDelegate<String>{
  late Future<ListRestaurant> _article;
  final TextEditingController _controller = TextEditingController();
  String queries = '';
  @override
  void initState() {
    _article = ApiService().getListRestaurant();
  }
  @override
  List<Widget> buildActions(BuildContext context) {
    // TODO: implement buildActions
    return [IconButton(icon: Icon(Icons.clear), onPressed: () {
      query = "";
      final TextEditingController _controller = TextEditingController();
    })];
  }

  @override
  Widget buildLeading(BuildContext context) {
    // TODO: implement buildLeading
    return IconButton(
        icon: AnimatedIcon(
          icon: AnimatedIcons.menu_arrow,
          progress: transitionAnimation,
        ),
        onPressed: () {Navigator.pop(context);});
  }


  @override
  Widget buildResults(BuildContext context) {
    if (query.length < 3) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Center(
            child: Text(
              "Search term must be longer than two letters.",
            ),
          )
        ],
      );
    }

    if (query.isNotEmpty == ResultState.HasData) {
      //Tampilan 1
      // Provider.of<RestaurantSearchProvider>(context, listen: false);
      // return Consumer<RestaurantSearchProvider>(
      //   builder: (context, state, _) {
      //     return ListView.builder(
      //       shrinkWrap: true,
      //       itemCount: state.result.restaurants.length,
      //       itemBuilder: (context, index) {
      //         var article = state.result.restaurants[index];
      //         return state.result.restaurants;
      //         },
      //       );
      //     },
      // );
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Center(
            child: Text(
              "Data sesuai",
            ),
          )
        ],
      );
    } else if (query.isNotEmpty != ResultState.HasData) {
      //Tampilan 1
      // Provider.of<RestaurantSearchProvider>(context, listen: false);
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Center(
            child: Text(
              "Data tidak ditemukan atau tidak sesuai",
            ),
          )
        ],
      );
    } else if (query.isEmpty) {
      //Tampilan 2
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Center(
            child: Text(
              "Data belum diisi",
            ),
          )
        ],
      );
    } else {
      //Tampilan 3
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Center(
            child: Text(
              "",
            ),
          )
        ],
      );
    }
    // return Consumer<RestaurantSearchProvider>(
    //   builder: (context, state, _) {
    //     if (state.state == ResultState.Loading) {
    //       return Center(child: CircularProgressIndicator());
    //     } else if (state.state == ResultState.HasData) {
    //       return ListView.builder(
    //         shrinkWrap: true,
    //         itemCount: state.result.restaurants.length,
    //         itemBuilder: (context, index) {
    //           var article = state.result.restaurants[index];
    //           return CardArticle(article: article);
    //         },
    //       );
    //     } else if (state.state == ResultState.NoData) {
    //       return Center(child: Text('Eror memuat data'));
    //     } else if (state.state == ResultState.Error) {
    //       return Center(child: Text('Gagal memuat data, silahkan periksa koneksi internet Anda'));
    //     } else {
    //       return Center(child: Text(''));
    //     }
    //   },
    // );

  }

  @override
  Widget buildSuggestions(BuildContext context) {
    // TODO: implement buildSuggestions
    return Center(
      child: Text('Masukkan kata kunci di mesin pencari aplikasi ini'),
    );
  }


}


