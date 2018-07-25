import { FormInput } from 'hocs';
import { TextInput, MarkdownEditor } from 'components';

export const FormTextInput = FormInput(TextInput);
export const FormMarkdownEditor = FormInput(MarkdownEditor);
