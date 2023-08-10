const querys = {
  getAllMessages: "SELECT TOP (30) * FROM Conversations WHERE UserID = @UserID",
  sendMessage:
    "INSERT INTO Conversations (Message, TimeReceived, SessionID, UserName, ReadMsg, UserId, TargetID, IsAns, AnswerTo) VALUES (@Message, CURRENT_TIMESTAMP, @SessionID, @UserName, @ReadMsg, @UserID, @TargetID, @IsAns, @AnswerTo)",
  getConversation: "SELECT * FROM  Conversations WHERE SessionID = @Session",
  countMessages:
    "SELECT COUNT (id) FROM [DB_CHAT].[dbo].[Conversations] WHERE SessionID = @idSession",
  deleteMessage:
    "DELETE FROM [DB_CHAT].[dbo].[Conversations] WHERE MessageID = @id",
  updateMessage:
    "UPDATE Conversations SET Message = @message FROM [DB_CHAT].[dbo].[Conversations] WHERE MessageID = @id",
  RegisterUser:
    "INSERT INTO [DB_CHAT].[dbo].[Login] ([UserName], [Status], [Type], [Password], [CreationDate] )VALUES (@userName, @status, @type, @password, CURRENT_TIMESTAMP)",
  getAllUsers:
    "SELECT US.UserID, US.UserName, US.Status, US.Type, ISNULL(SS1.IdSession, SS2.IdSession) AS Session FROM Users AS US	LEFT JOIN Session AS SS1 ON US.UserID = SS1.LoginID_Origin AND SS1.LoginID_Target = @id	LEFT JOIN Session AS SS2 ON US.UserID = SS2.LoginID_Target AND SS2.LoginID_Origin = @id ORDER BY (CASE WHEN UserID = @id THEN 0 ELSE 1 END), UserID",
  login:
    "SELECT COUNT(1) AS existentUser, UserName, LoginID  FROM DB_CHAT.[dbo].[Login] WHERE UserName = @userName AND [Password] = @password GROUP BY UserName, LoginID",
};

module.exports = querys;
