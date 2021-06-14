interface ConsoleUtilsInterface {
	/**
	 * Default log util for messages with cyan [LOG] prefix
	 * @param message your message
	 */
	log(message: string): void;
	/**
	 * Warn log util for warning messages with yellow [WARNING] prefix
	 * @param message your message
	 */
	warn(message: string): void;
	/**
	 * Error log util for error messages with light red [ERROR] prefix
	 * @param message your message
	 */
	error(message: string): void;
	/**
	 * Critical error log util for critical error messages with red [CRITICAL] prefix. Use only when program crashes
	 * @param message your message
	 */
	critical(message: string): void;
	/**
	 * Customizeable log util which can be used to display custom prefix and custom message color.
	 * @param prefix your prefix
	 * @param message your message
	 * @param prefixColor your prefix color (HEX)
	 * @param textColor your text color (HEX)
	 */
	customizable(prefix: string, message: string, prefixColor: string, textColor: string): void;
}

export = ConsoleUtilsInterface;
