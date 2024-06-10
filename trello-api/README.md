# backend-learning

## Trello Diagrams

``` mermaid

classDiagram
  class Board {
  _id: String!
  description: String!
  title: String!
  type: String!
  ownerIds: List~String~ = []
  memberIds: List~String~ = []
  columnOrderIds: List~String~ = []
  createdAt: Timestamp = Date.now
  updatedAt: Timestamp = null
  _destroy: Boolean = false
}

class Column  {
  _id: String!
  boardId: String!
  title: String!
  cardOrderIds: List~String~ = []
  createdAt: Timestamp = Date.now
  updatedAt: Timestamp = null
  _destroy: Boolean = false
}

class Card {
  _id: String!
  boardId: String!
  columnId: String!
  title: String!
  cover: String =  ""
  description: String = "
  memberIds: List~String~ = []
  comments: List~Object[userId: String
    userEmail: String
    userAvatar: String
    userDisplayName: String
    content: String
    createdAt: Timestamp]~
  attachments: List~Object[
    fileName: String
    fileType: String
    fileURL: String
    createdAt: Timestamp
  ]~
  createdAt: Timestamp = Date.now
  updatedAt: Timestamp = null
  _destroy: Boolean = false
}

class User {
  id: String!
  email: String!
  password: String!
  username: String = default from email
  displayName?: String
  avatar: String = default from system image
  role: String~"admin" | "user" | "dev" |...~
  isActive: Boolean = false
  verifyToken: String or Null
  createdAt: Timestamp = Date.now
  updatedAt: Timestamp = null
}

class Invitation {
  _id: String!
  inviterId: String!
  inviteeId: String!
  type: String!
  boardInvitation: Object[
    boardId: String
    status: String
  ]
  createdAt: Timestamp = Date.now
  updatedAt: Timestamp = null
  _destroy: Boolean = false
}
```
