//
//  DetailView.swift
//  FundamentaliOS2
//
//  Created by user233987 on 3/30/23.
//
import SwiftUI

struct DetailView: View {
    var bookDetail: BookModel
    @State private var isFavorite: Bool = false
    let localData = LocalData()
    var body: some View {
        VStack {
            AsyncImage(
                url: URL(string: bookDetail.picturebook),
                content: {image in
                    image
                        .resizable()
                        .frame(maxWidth: 220, maxHeight: 280)
                },
                placeholder: {
                    ProgressView()
                }
            )
            Text(bookDetail.namebook)
                .font(.title)
                .padding(.top, 10)
            Text(bookDetail.descriptionbook)
            Text(bookDetail.authorbook)
            Text(bookDetail.publisherbook)
            Text(bookDetail.createdat)
        }
        .onAppear {
            getFavorite()
        }
        .navigationBarTitle(Text(bookDetail.namebook), displayMode: .inline)
        .navigationBarItems(trailing: HStack{
            if isFavorite {
                Button {
                    self.removeFromFavorite()
                } label: {
                    Image(systemName: "heart.fill")
                        .imageScale(.large)
                }
            } else {
                Button {
                    self.addToFavorite()
                } label: {
                    Image(systemName: "heart")
                        .imageScale(.large)
                }
            }
        })
    }
    
    func addToFavorite() {
        localData.saveBook(bookDetail) { success in
            if success {
                isFavorite = true
            }
        }
    }
       
    func removeFromFavorite() {
        localData.deleteBook(bookDetail.idbook) { success in
            if success {
                isFavorite = false
            }
        }
    }
    
    func getFavorite() {
        localData.getBook(bookDetail.idbook) { book in
            if book != nil {
                isFavorite = true
            }
        }
    }
}
 
struct DetailView_Previews: PreviewProvider {
    static var previews: some View {
        DetailView(bookDetail: BookModel(
            idbook: "3498",
            picturebook: "https://books.google.com/books/publisher/content/images/frontcover/DBvFEAAAQBAJ?fife=w480-h690",
            namebook: "Bookd",
            descriptionbook: "hvfhvjhgfb",
            authorbook: "berhhvbrv",
            publisherbook: "vhfduvhudfv",
            iscompleted: 1,
            isfavorite: 1,
            createdat: "2023-10-11",
            updatedat: "2023-10-11"
        ))
    }
}
