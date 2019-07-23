import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'default', label: 'Default' },
  { value: 'Proof of action', label: 'Proof of action' },
  { value: 'Code', label: 'Code' },
  { value: 'Graphic design', label: 'Graphic design' },
  { value: 'Translation', label: 'Translation' },
  { value: 'Idea generation', label: 'Idea generation' },
  { value: 'Feedback & critique', label: 'Feedback & critique' },
  { value: 'Survey', label: 'Survey' },
  { value: 'Recruitment', label: 'Recruitment' }
];

class BountyTemplateDropdown extends React.Component {
  state = {
    selectedOption: null
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        clearable={false}
        searchable={false}
      />
    );
  }
}

export default BountyTemplateDropdown;
