//
//  LocalData.swift
//  FundamentaliOS2
//
//  Created by user233987 on 3/30/23.
//

import Foundation
import CoreData
 
class LocalData {
    lazy var persistentContainer: NSPersistentContainer = {
        let container = NSPersistentContainer(name: "FavoriteLocal")
 
        container.loadPersistentStores { _, error in
            guard error == nil else {
                fatalError("Unresolved \(error!)")
            }
        }
        container.viewContext.automaticallyMergesChangesFromParent = false
        container.viewContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
        container.viewContext.shouldDeleteInaccessibleFaults = true
        container.viewContext.undoManager = nil
 
        return container
    }()
 
    private func newTaskContext() -> NSManagedObjectContext {
        let taskContext = persistentContainer.newBackgroundContext()
        taskContext.undoManager = nil
 
        taskContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
        return taskContext
    }
 
    func getAllBooks(completion: @escaping(_ books: [BookModel]) -> Void) {
        let taskContext = newTaskContext()
        taskContext.perform {
            let fetchRequest = NSFetchRequest<NSManagedObject>(entityName: "Entity")
            do {
                let results = try taskContext.fetch(fetchRequest)
                var books: [BookModel] = []
                for result in results {
                    let book = BookModel(
                        idbook: (result.value(forKeyPath: "idbook") as? String)!,
                        picturebook: (result.value(forKeyPath: "picturebook") as? String)!,
                        namebook: (result.value(forKeyPath: "namebook") as? String)!,
                        descriptionbook: (result.value(forKeyPath: "descriptionbook") as? String)!,
                        authorbook: (result.value(forKeyPath: "authorbook") as? String)!,
                        publisherbook: (result.value(forKeyPath: "publisherbook") as? String)!,
                        iscompleted: (result.value(forKeyPath: "iscompleted") as? Int)!,
                        isfavorite: (result.value(forKeyPath: "isfavorite") as? Int)!,
                        createdat: (result.value(forKeyPath: "createdat") as? String)!,
                        updatedat: (result.value(forKeyPath: "updatedat") as? String)!
                    )
                    print(book)
                    books.append(book)
                }
                completion(books)
            } catch let error as NSError {
                print("Could not fetch. \(error), \(error.userInfo)")
            }
        }
    }
 
    func getBook(_ idbook: String, completion: @escaping(_ book: BookModel?) -> Void) {
        let taskContext = newTaskContext()
        taskContext.perform {
            let fetchRequest = NSFetchRequest<NSManagedObject>(entityName: "Entity")
            fetchRequest.fetchLimit = 1
            fetchRequest.predicate = NSPredicate(format: "idbook == %@", idbook)
            do {
                if let result = try taskContext.fetch(fetchRequest).first {
                    let book = BookModel(
                        idbook: (result.value(forKeyPath: "idbook") as? String)!,
                        picturebook: (result.value(forKeyPath: "picturebook") as? String)!,
                        namebook: (result.value(forKeyPath: "namebook") as? String)!,
                        descriptionbook: (result.value(forKeyPath: "descriptionbook") as? String)!,
                        authorbook: (result.value(forKeyPath: "authorbook") as? String)!,
                        publisherbook: (result.value(forKeyPath: "publisherbook") as? String)!,
                        iscompleted: (result.value(forKeyPath: "iscompleted") as? Int)!,
                        isfavorite: (result.value(forKeyPath: "isfavorite") as? Int)!,
                        createdat: (result.value(forKeyPath: "createdat") as? String)!,
                        updatedat: (result.value(forKeyPath: "updatedat") as? String)!
                    )
                    completion(book)
                }
            } catch let error as NSError {
                print("Could not fetch. \(error), \(error.userInfo)")
                completion(nil)
            }
        }
    }
 
    func saveBook(_ bookData: BookModel, completion: @escaping(_ success: Bool) -> Void) {
        let taskContext = newTaskContext()
        taskContext.performAndWait {
            if let entity = NSEntityDescription.entity(forEntityName: "Entity", in: taskContext) {
                let member = NSManagedObject(entity: entity, insertInto: taskContext)
                member.setValue(bookData.idbook, forKey: "idbook")
                member.setValue(bookData.picturebook, forKey: "picturebook")
                member.setValue(bookData.namebook, forKey: "namebook")
                member.setValue(bookData.descriptionbook, forKey: "descriptionbook")
                member.setValue(bookData.authorbook, forKey: "authorbook")
                member.setValue(bookData.publisherbook, forKey: "publisherbook")
                member.setValue(bookData.iscompleted, forKey: "iscompleted")
                member.setValue(bookData.isfavorite, forKey: "isfavorite")
                member.setValue(bookData.createdat, forKey: "createdat")
                member.setValue(bookData.updatedat, forKey: "updatedat")
                do {
                    try taskContext.save()
                    completion(true)
                } catch let error as NSError {
                    print("Could not save. \(error), \(error.userInfo)")
                    completion(false)
                }
            }
        }
    }
 
    func deleteBook(_ idbook: String, completion: @escaping(_ success: Bool) -> Void) {
        let taskContext = newTaskContext()
        taskContext.perform {
            let fetchRequest = NSFetchRequest<NSFetchRequestResult>(entityName: "Entity")
            fetchRequest.fetchLimit = 1
            fetchRequest.predicate = NSPredicate(format: "idbook == %@", idbook)
            let batchDeleteRequest = NSBatchDeleteRequest(fetchRequest: fetchRequest)
            batchDeleteRequest.resultType = .resultTypeCount
            if let batchDeleteResult = try? taskContext.execute(batchDeleteRequest) as? NSBatchDeleteResult {
                if batchDeleteResult.result != nil {
                    completion(true)
                } else {
                    completion(false)
                }
            }
        }
    }
 
}
