export const keyCodes = {
	0: "That key has no keycode",//
	3: "break",//
	8: "Backspace",
	9: "Tab",
	12: "clear",//
	13: "Enter",
	16: "Shift",
	17: "Control",
	18: "Alt",
	19: "Pause",
	20: "CapsLock",
	21: "hangul",//
	25: "hanja",//
	27: "Escape",
	28: "conversion",//
	29: "non-conversion",//
	32: "Space",
	33: "PageUp",
	34: "PageDown",
	35: "End",
	36: "Home",
	37: "ArrowLeft",
	38: "ArrowUp",
	39: "ArrowRight",
	40: "ArrowDown",
	41: "select",//
	42: "print",//
	43: "execute",//
	44: "Print Screen",//
	45: "Insert",
	46: "Delete",
	47: "help",//
	48: "Digit0",
	49: "Digit1",
	50: "Digit2",
	51: "Digit3",
	52: "Digit4",
	53: "Digit5",
	54: "Digit6",
	55: "Digit7",
	56: "Digit8",
	57: "Digit9",
	58: ":",//
	59: "semicolon (firefox), equals",//
	60: "<",//
	61: "equals (firefox)",//
	63: "ß",//
	64: "@ (firefox)",//
	65: "KeyA",
	66: "KeyB",
	67: "KeyC",
	68: "KeyD",
	69: "KeyE",
	70: "KeyF",
	71: "KeyG",
	72: "KeyH",
	73: "KeyI",
	74: "KeyJ",
	75: "KeyK",
	76: "KeyL",
	77: "KeyM",
	78: "KeyN",
	79: "KeyO",
	80: "KeyP",
	81: "KeyQ",
	82: "KeyR",
	83: "KeyS",
	84: "KeyT",
	85: "KeyU",
	86: "KeyV",
	87: "KeyW",
	88: "KeyX",
	89: "KeyY",
	90: "KeyZ",
	91: "Meta",
	92: "right window key",//?//
	93: "ContextMenu",
	95: "sleep",//
	96: "0",
	97: "1",
	98: "2",
	99: "3",
	100: "4",
	101: "5",
	102: "6",
	103: "7",
	104: "8",
	105: "9",
	106: "Multiply",
	107: "Add",
	108: "numpad period (firefox)",//
	109: "Subtract",
	110: "Decimal",
	111: "Divide",
	112: "F1",
	113: "F2",
	114: "F3",
	115: "F4",
	116: "F5",
	117: "F6",
	118: "F7",
	119: "F8",
	120: "F9",
	121: "F10",
	122: "F11",
	123: "F12",
	124: "F13",
	125: "F14",
	126: "F15",
	127: "F16",
	128: "F17",
	129: "F18",
	130: "F19",
	131: "F20",
	132: "F21",
	133: "F22",
	134: "F23",
	135: "F24",
	136: "F25",
	137: "F26",
	138: "F27",
	139: "F28",
	140: "F29",
	141: "F30",
	142: "F31",
	143: "F32",
	144: "NumLock",
	145: "ScrollLock",
	151: "airplane mode",//
	160: "^",//
	161: "!",//
	162: "؛ (arabic semicolon)",//
	163: "#",//
	164: "$",//
	165: "ù",//
	166: "page backward",//
	167: "page forward",//
	168: "refresh",//
	169: "closing paren (AZERTY)",//
	170: "*",//
	171: "~ + * key",//
	172: "home key",//
	173: "minus (firefox), mute/unmute",//
	174: "decrease volume level",//
	175: "increase volume level",//
	176: "next",//
	177: "previous",//
	178: "stop",//
	179: "play/pause",//
	180: "e-mail",//
	181: "mute/unmute (firefox)",//
	182: "decrease volume level (firefox)",//
	183: "increase volume level (firefox)",//
	186: "Semicolon",
	187: "equal sign",//
	188: "Comma",
	189: "dash",//
	190: "Period",
	191: "Slash",
	192: "Backquote",
	193: "?, / or °",//
	194: "numpad period (chrome)",//
	219: "BracketLeft",
	220: "Backslash",
	221: "BracketRight",
	222: "Quote",
	223: "`",//
	224: "left or right ⌘ key (firefox)",//
	225: "altgr",//
	226: "< /git >, left back slash",//
	230: "GNOME Compose Key",//
	231: "ç",//
	233: "XF86Forward",//
	234: "XF86Back",//
	235: "non-conversion",//
	240: "alphanumeric",//
	242: "hiragana/katakana",//
	243: "half-width/full-width",//
	244: "kanji",//
	251: "unlock trackpad (Chrome/Edge)",//
	255: "toggle touchpad"//
};

export const getCode = (ev: KeyboardEvent) => {
	if (ev.code) return ev.code;
	return (ev.location == 3 ? "Numpad" : "")+keyCodes[ev.which] + (ev.location == 1 ? "Left" : ev.location == 2 ? "Right" : "");
};