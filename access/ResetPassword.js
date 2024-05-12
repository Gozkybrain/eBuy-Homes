import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getAuth, updatePassword, signInWithEmailAndPassword } from 'firebase/auth';

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false); // New state variable for saving/loading state

  const auth = getAuth(); // Get the authentication instance

  const handleChangePassword = async () => {
    try {
      // Check if old password matches the current password
      if (auth.currentUser && oldPassword) {
        try {
          await signInWithEmailAndPassword(auth, auth.currentUser.email, oldPassword);
        } catch (error) {
          throw new Error('Old password is incorrect.');
        }
      } else {
        throw new Error('Old password is missing.');
      }

      // Check if new password and confirm password match and are not empty
      if (!newPassword || !confirmPassword) {
        throw new Error('New password or confirm password cannot be empty.');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match. Please confirm the password.');
      }

      // Set saving state to true to display the ActivityIndicator
      setSaving(true);

      await updatePassword(auth.currentUser, newPassword);
      Alert.alert('Password Updated Successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error Changing Password', error.message);
    } finally {
      // Reset saving state regardless of success or failure
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Change Password</Text>
        )}
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  button: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ResetPassword;
