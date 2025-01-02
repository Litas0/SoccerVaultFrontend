import { useState } from 'react';
import { Checkbox, Text, UnstyledButton } from '@mantine/core';
import classes from '../modules/CheckboxCard.module.css';


function CheckboxCard({form}) {
  const [value, setValue] = useState(false);

  const changeValue = async () => 
  {
    await setValue(v => !v)   
    await form.setFieldValue('rematches', value)
  }

  return (
    <UnstyledButton onClick={changeValue} className={classes.button}  style={{ marginTop: '30px'}}>
      <Checkbox
        checked={value}
        onChange={() => {}}
        tabIndex={-1}
        size="md"
        mr="xl"
        styles={{ input: { cursor: 'pointer' } }}
      />

      <div>
        <Text fw={500} mb={7} lh={1}>
          Rematch round
        </Text>
        <Text fz="sm" c="dimmed">
          Choose if rematches should be played 
        </Text>
      </div>
    </UnstyledButton>
  );
}

export default CheckboxCard;