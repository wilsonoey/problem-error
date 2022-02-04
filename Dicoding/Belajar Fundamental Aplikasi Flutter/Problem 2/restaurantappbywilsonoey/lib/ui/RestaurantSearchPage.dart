import 'package:flutter/material.dart';

class SearchPage extends SearchDelegate<String>{
  // late Future<ArticlesResult> _article;
  //
  // @override
  // void initState() {
  //   _article = ApiService().getListRestaurant();
  // }
  @override
  List<Widget> buildActions(BuildContext context) {
    // TODO: implement buildActions
    return [IconButton(icon: Icon(Icons.clear), onPressed: () {
      query = "";
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
    return Center(
      child: Text('Result User'),
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    // TODO: implement buildSuggestions
    return Center(
      child: Text('Masukkan kata kunci di mesin pencari aplikasi ini'),
    );
  }


}
