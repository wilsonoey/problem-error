class ArticlesResult {
  ArticlesResult({
    required this.error,
    required this.status,
    required this.totalResults,
    required this.articles,
  });

  bool error;
  String status;
  int totalResults;
  List<Article> articles;

  factory ArticlesResult.fromJson(Map<String, dynamic> json) => ArticlesResult(
    error: json["error"],
    status: json["message"],
    totalResults: json["count"],
    articles: List<Article>.from(json["restaurants"].map((x) => Article.fromJson(x))),
      );
}

class Article {
  String id;
  String name;
  String description;
  String pictureId;
  String city;
  double rating;

  Article({
    required this.id,
    required this.name,
    required this.description,
    required this.pictureId,
    required this.city,
    required this.rating,
  });

  factory Article.fromJson(Map<String, dynamic> json) => Article(
    id: json["id"],
    name: json["name"],
    description: json["description"],
    pictureId: json["pictureId"],
    city: json["city"],
    rating: json["rating"].toDouble(),
  );
}
