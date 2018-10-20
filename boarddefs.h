//******************************************************************************
// IRremote
// Version 2.0.1 June, 2015
// Copyright 2009 Ken Shirriff
// For details, see http://arcfn.com/2009/08/multi-protocol-infrared-remote-library.html

// This file contains all board specific information. It was previously contained within
// IRremoteInt.h

// Modified by Paul Stoffregen <paul@pjrc.com> to support other boards and timers
//
// Interrupt code based on NECIRrcv by Joe Knapp
// http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?num=1210243556
// Also influenced by http://zovirl.com/2008/11/12/building-a-universal-remote-with-an-arduino/
//
// JVC and Panasonic protocol added by Kristian Lauszus (Thanks to zenwheel and other people at the original blog post)
// Whynter A/C ARC-110WD added by Francesco Meschia

// Sparkfun Pro Micro support by Alastair McCormack
//******************************************************************************

#ifndef boarddefs_h
#define boarddefs_h
#define BLINKLED        13
#define BLINKLED_ON()  (PORTB |= B00100000)
#define BLINKLED_OFF()  (PORTB &= B11011111)
#ifdef F_CPU
#	define SYSCLOCK  F_CPU     // main Arduino clock
#else
#	define SYSCLOCK  16000000  // main Arduino clock
#endif
#define USECPERTICK    50

#define TIMER_RESET
#define TIMER_ENABLE_PWM   (TCCR1A |= _BV(COM1B1))
#define TIMER_DISABLE_PWM  (TCCR1A &= ~(_BV(COM1B1)))
#define TIMER_ENABLE_INTR   (TIMSK1 = _BV(OCIE1A))
#define TIMER_DISABLE_INTR  (TIMSK1 = 0)
#define TIMER_INTR_NAME       TIMER1_COMPA_vect
#define TIMER_CONFIG_KHZ(val) ({ \
	const uint16_t pwmval = SYSCLOCK / 2000 / (val); \
	TCCR1A                = _BV(WGM11); \
	TCCR1B                = _BV(WGM13) | _BV(CS10); \
	ICR1                  = pwmval; \
	OCR1B                 = pwmval / 3; \
})
#define TIMER_CONFIG_NORMAL() ({ \
	TCCR1A = 0; \
	TCCR1B = _BV(WGM12) | _BV(CS10); \
	OCR1A  = SYSCLOCK * USECPERTICK / 1000000; \
	TCNT1  = 0; \
})
#define TIMER_PWM_PIN  10
#endif // ! boarddefs_h
