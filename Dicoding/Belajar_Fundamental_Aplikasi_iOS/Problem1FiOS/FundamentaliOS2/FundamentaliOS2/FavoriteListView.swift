//
//  FavoriteListView.swift
//  FundamentaliOS2
//
//  Created by user233987 on 3/30/23.
//

import SwiftUI
 
struct FavoriteListView: View {
    @State private var books = [BookModel]()
    @State var localData: LocalData = LocalData()
    var body: some View {
        List(books) { book in
            NavigationLink(destination: DetailView(bookDetail: book)) {
                BookRowView(book: book)
            }
        }
        .onAppear() {
            localData.getAllBooks { book in
                books = book
                if book.count == 0 {
                    var body: some View {
                        EmptyListView()
                    }
                }
            }
        }
        .navigationBarTitle(Text("Favorite Books"), displayMode: .inline)
    }
}
 
struct FavoriteListView_Previews: PreviewProvider {
    static var previews: some View {
        FavoriteListView()
    }
}
