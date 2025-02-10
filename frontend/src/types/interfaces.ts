export interface Message {
  id: string;
  body: string;
  senderId: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageType extends Message {
  shouldShake?: boolean;
}

export interface SignupInputs {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export interface ConversationType {
  id: string;
  fullName: string;
  profilePic: string;
}

export interface UserType {
  id: string;
  fullName: string;
  username: string;
  profilePic: string;
  gender: string;
}
export interface UserProfileType extends UserType {
  unSeenConversationsIds: string[];
  userId: string;
}
