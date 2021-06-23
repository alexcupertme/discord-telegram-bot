export interface ConsoleUtilsInterface {
	/**
	 * Default log util for messages with cyan [LOG] prefix
	 * @param message your message
	 */
	log(message: string | number | Array<any> | Record<string, any> | null | undefined): void;
	/**
	 * Warn log util for warning messages with yellow [WARNING] prefix
	 * @param message your message
	 */
	warn(message: string | number | Array<any> | Record<string, any> | null | undefined): void;
	/**
	 * Success log util for success messages with green [SUCCESS] prefix
	 * @param message your message
	 */
	success(message: string | number | Array<any> | Record<string, any> | null | undefined): void;
	/**
	 * Error log util for error messages with light red [ERROR] prefix
	 * @param message your message
	 */
	error(message: string | number | Array<any> | Record<string, any> | null | undefined): void;
	/**
	 * Critical error log util for critical error messages with red [CRITICAL] prefix. Use only when program crashes
	 * @param message your message
	 */
	critical(message: string | number | Array<any> | Record<string, any> | null | undefined): void;
	/**
	 * Customizeable log util which can be used to display custom prefix and custom message color.
	 * @param prefix your prefix
	 * @param message your message
	 * @param prefixColor your prefix color (HEX)
	 * @param textColor your text color (HEX)
	 */
	customizable(prefix: string, message: string | number | Array<any> | Record<string, any> | null | undefined, prefixColor: string, textColor: string): void;
	/**
	 * Default console log
	 * @param any any object / type / array
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default(any: any): void;
}
