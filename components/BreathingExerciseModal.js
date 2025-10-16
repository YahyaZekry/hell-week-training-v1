
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const BreathingExerciseModal = ({ visible, onClose }) => {
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    let interval;
    if (visible) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) {
            return prevTimer - 1;
          } else {
            if (breathingPhase === 'inhale') {
              setBreathingPhase('hold');
              return 4;
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('exhale');
              return 6;
            } else {
              setBreathingPhase('inhale');
              return 4;
            }
          }
        });
      }, 1000);
    } else {
      setBreathingPhase('inhale');
      setTimer(4);
    }

    return () => clearInterval(interval);
  }, [visible, breathingPhase]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Breathing Exercise</Text>
          <Text style={styles.breathingPhase}>{breathingPhase.toUpperCase()}</Text>
          <Text style={styles.timer}>{timer}</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#ffd700',
    fontSize: 20,
    fontWeight: 'bold',
  },
  breathingPhase: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e0e0e0',
    marginBottom: 15,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2c5aa0',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BreathingExerciseModal;
