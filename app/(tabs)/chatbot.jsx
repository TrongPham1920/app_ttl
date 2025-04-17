import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useAuth } from '../../global/AuthenticationContext';
import { useChatBot } from '../../hooks/chatbot/chatBotModal';

const ChatbotScreen = () => {
  const { profile } = useAuth();
  const { messages, inputMessage, setInputMessage, onSend } = useChatBot();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 0}
      >
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={styles.messageRow}>
              {item.sender === 'bot' && (
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: '100%' }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image
                      source={{
                        uri: 'https://res.cloudinary.com/dqipg0or3/image/upload/v1740564293/avatars/oil5t4os8o5x6dmmwusw.png',
                      }}
                      style={styles.avatar}
                    />
                  </View>
                  <View style={{ flex: 9 }}>
                    <Text style={[styles.senderName, { textAlign: 'left' }]}>TROTHALO</Text>
                    <View style={[styles.message, styles.botMessage]}>
                      <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                  </View>
                </View>
              )}

              {item.sender === 'user' && (
                <View style={{ width: '100%' }}>
                  <Text style={[styles.senderName, { textAlign: 'right' }]}>{profile?.name || 'Bạn'}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <View style={{ flex: 9 }}>
                      <View style={[styles.message, styles.userMessage]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Image source={{ uri: profile.avatar }} style={styles.avatar} />
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          inverted
          contentContainerStyle={{ padding: 10 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            value={inputMessage}
            onChangeText={setInputMessage}
          />
          <Button title="Gửi" onPress={onSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageRow: {
    marginVertical: 5,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '100%',
  },
  botMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#4caf50',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 5,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    width: '90%',
  },
});

export default ChatbotScreen;
