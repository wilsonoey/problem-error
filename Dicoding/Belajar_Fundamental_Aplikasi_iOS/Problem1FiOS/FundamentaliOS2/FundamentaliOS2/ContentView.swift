//
//  ContentView.swift
//  FundamentaliOS2
//
//  Created by user233987 on 3/30/23.
//

import SwiftUI

struct ContentView: View {
    @State private var books = [BookModel]()
    @State private var isLoading = true
 
    var body: some View {
        NavigationView {
            VStack {
                if isLoading {
                    ProgressView()
                } else {
                    List(books) { book in
                        NavigationLink(destination: DetailView(bookDetail: book)) {
                            BookRowView(book: book)
                        }
                    }
                }
            }
            .onAppear {
                NetworkManager().getBooks { (books) in
                    if let books = books?.data {
                        self.books = books
                        self.isLoading = false
                    }
                }
            }.navigationBarTitle(Text("Books"), displayMode: .inline)
            .navigationBarItems(trailing:
                NavigationLink(destination: ProfileView()) {
                    Image(systemName: "person.fill")
                        .imageScale(.large)
                }
            )
            .navigationBarItems(trailing:
                NavigationLink(destination: AddItemView()) {
                    Image(systemName: "plus")
                        .imageScale(.large)
                }
            )
            .navigationBarItems(leading:
                NavigationLink(destination: FavoriteListView()) {
                    Image(systemName: "heart.fill")
                        .imageScale(.large)
                }
            )
        }
    }
}
 
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
