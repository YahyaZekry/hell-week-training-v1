import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';

interface BreathingExerciseModalProps {
  visible: boolean;
  onClose: () => void;
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale';

const BreathingExerciseModal: React.FC<BreathingExerciseModalProps> = ({ visible, onClose }) => {
  const [breathingPhase, setBreathingPhase] = useState<BreathingPhase>('inhale');
  const [timer, setTimer] = useState<number>(4);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
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

interface Styles {
  centeredView: ViewStyle;
  modalView: ViewStyle;
  modalText: TextStyle;
  breathingPhase: TextStyle;
  timer: TextStyle;
  button: ViewStyle;
  buttonClose: ViewStyle;
  textStyle: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' as const,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1a1a1a' as const,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000' as const,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ffd700' as const,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#ffd700' as const,
    fontSize: 20,
    fontWeight: 'bold',
  },
  breathingPhase: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e0e0e0' as const,
    marginBottom: 15,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffd700' as const,
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2c5aa0' as const,
  },
  textStyle: {
    color: '#ffffff' as const,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BreathingExerciseModal;