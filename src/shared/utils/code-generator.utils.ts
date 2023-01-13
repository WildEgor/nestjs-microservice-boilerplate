export class CodeGenerator {

  public static generate(codeLength = 6): number {
    // Math.random returns number values such as 0.12645...
    // Multiply this value on 10 to the power of code length we will receive needed code
    // 0.12645... * (10 ** 4) = 1264.5...
    let multiplier = 10 ** codeLength;
    let generatedCode = Math.floor(Math.random() * multiplier).toString();

    // Sometimes it generates 3-digit code instead of 4-digit (if codeLength === 4)
    // Until we get code with required length we won't stop generate code
    // It generates only part, that we need (1-digit for 4-digit code for example)
    while (generatedCode.length !== codeLength) {
      const missingDigitsCount = codeLength - generatedCode.length;

      // If we get code with more than 4-digits(it's impossible, but 3-digits impossible too :P )
      if (missingDigitsCount < 0) {
        generatedCode = generatedCode.slice(0, 4);
        continue;
      }

      // Generates only part, that we need, and concat with old(wrong) generated code
      multiplier = 10 ** missingDigitsCount;
      const missingDigits = Math.floor(Math.random() * multiplier).toString();
      generatedCode += missingDigits;
    }

    return Number(generatedCode);
  }

}
