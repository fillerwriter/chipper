import NormalizeInput from './NormaliseInput';

export default function InputProcessor(rawInput) {
  return {
    raw: rawInput,
    normalized: NormalizeInput(rawInput)
  };
}
