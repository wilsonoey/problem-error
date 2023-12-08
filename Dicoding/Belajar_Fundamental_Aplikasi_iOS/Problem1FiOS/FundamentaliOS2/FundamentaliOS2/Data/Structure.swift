//
//  Structure.swift
//  FundamentaliOS2
//
//  Created by user233987 on 3/30/23.
//

import Foundation

struct BookResponse: Codable {
    let count: Int?
    let data: [BookModel]?
}
 
struct BookModel: Identifiable, Codable {
    let idbook, picturebook, namebook, descriptionbook, authorbook, publisherbook, createdat, updatedat: String
    let iscompleted, isfavorite: Int
    var id: String { return idbook }
 
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        idbook = try container.decode(String.self, forKey: .idbook)
        picturebook = try container.decode(String.self, forKey: .picturebook)
        namebook = try container.decode(String.self, forKey: .namebook)
        descriptionbook = try container.decode(String.self, forKey: .descriptionbook)
        authorbook = try container.decode(String.self, forKey: .authorbook)
        publisherbook = try container.decode(String.self, forKey: .publisherbook)
        iscompleted = try container.decode(Int.self, forKey: .iscompleted)
        isfavorite = try container.decode(Int.self, forKey: .isfavorite)
//        let dateFormatter = DateFormatter()
//        dateFormatter.dateFormat = "yyyy-MM-dd"
        createdat = try container.decode(String.self, forKey: .createdat)
        updatedat = try container.decode(String.self, forKey: .updatedat)
//        let createdate = dateFormatter.date(from: createdateString)!
//        let updatedate = dateFormatter.date(from: updatedateString)!
//        let dateFormat = DateFormatter()
//        dateFormat.dateFormat = "MMM, d YY"
//        createdat = dateFormat.string(from: createdate)
//        updatedat = dateFormat.string(from: updatedate)
    }
 
    init(
        idbook: String,
        picturebook: String,
        namebook: String,
        descriptionbook: String,
        authorbook: String,
        publisherbook: String,
        iscompleted: Int,
        isfavorite: Int,
        createdat: String,
        updatedat: String
    ) {
        self.idbook = idbook
        self.picturebook = picturebook
        self.namebook = namebook
        self.descriptionbook = descriptionbook
        self.authorbook = authorbook
        self.publisherbook = publisherbook
        self.iscompleted = iscompleted
        self.isfavorite = isfavorite
        self.createdat = createdat
        self.updatedat = updatedat
    }
}
