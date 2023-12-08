//
//  BookRowView.swift
//  FundamentaliOS2
//
//  Created by user233987 on 3/30/23.
//

import SwiftUI

struct BookRowView: View {
    var book: BookModel
    
    var body: some View {
        HStack {
            AsyncImage(
                url: URL(string: book.picturebook),
                content: {image in
                    image
                        .resizable()
                        .frame(maxWidth: 120, maxHeight: 180)
                },
                placeholder: {
                    ProgressView()
                }
            )
            Spacer()
            Text(book.namebook)
            Spacer()
        }
    }
    
}
 
struct BookRowView_Previews: PreviewProvider {
    static var previews: some View {
        BookRowView(
            book: BookModel(
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
            )
        )
    }
}
