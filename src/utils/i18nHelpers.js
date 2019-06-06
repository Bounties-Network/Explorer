import intl from 'react-intl-universal';

export function translateOption(prefix, option) {
  return {
    ...option,
    label: intl.get(prefix + '.' + option.label.toLowerCase())
  };
}
