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
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../global/AuthenticationContext';
import { useChatBot } from '../../hooks/chatbot/chatBotModal';
import FormatUtils from "../../utils/format/Format";

const ChatbotScreen = () => {
  const router = useRouter();
  const { profile } = useAuth();
  const { messages, inputMessage, setInputMessage, onSend } = useChatBot();

  const renderBotHotelList = (hotels) => (
    <View>
      {hotels.map((hotel, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.hotelCard, { marginBottom: index === hotels.length - 1 ? 0 : 10 }]}
          onPress={() => router.push({
            pathname: "/detail",
            params: {id: hotel.id}
          })} 
        >
          <Text style={styles.hotelTitle}>{hotel.name}</Text>
          <Image source={{ uri: hotel.avatar }} style={styles.hotelImage} />
          <Text style={styles.hotelAddress}>Địa chỉ: {hotel.address}</Text>
          <Text style={styles.hotelPrice}>Giá: {FormatUtils.vndPrice(hotel.price)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderItem = ({ item }) => {
    if (item.sender === 'bot') {
      return (
        <View style={styles.messageRow}>
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
              {Array.isArray(item.data) ? (
                renderBotHotelList(item.data)
              ) : (
                <View style={[styles.message, styles.botMessage]}>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      );
    }

    if (item.sender === 'user') {
      return (
        <View style={styles.messageRow}>
          <Text style={[styles.senderName, { textAlign: 'right' }]}>{profile?.name || 'Bạn'}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <View style={{ flex: 9 }}>
              <View style={[styles.message, styles.userMessage]}>
                <Text style={{color:'#fff', fontSize: 16, flexWrap: 'wrap'}}>{item.text}</Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            </View>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 0}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
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
    backgroundColor: '#2196f3',
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
  hotelCard: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  hotelTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  hotelAddress: {
    fontSize: 14,
    color: '#555',
  },
  hotelPrice: {
    fontSize: 14,
    color: 'red',
    marginBottom: 4,
  },
  hotelImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 8,
  },
});

export default ChatbotScreen;
