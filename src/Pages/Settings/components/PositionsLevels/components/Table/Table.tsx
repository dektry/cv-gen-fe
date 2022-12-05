import { useEffect, useState } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import { AddButton } from 'common-components/AddButton';
import { DeleteModal } from 'common-components/DeleteModal';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  data: { id?: string; name: string }[];
  name: string;
}

interface FormValues {
  data: { id?: string; name: string }[];
}

export const TableComponent = ({ data, name }: IProps) => {
  const classes = useStyles({ theme });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [id, setId] = useState(0);

  const { control, reset } = useForm<FormValues>({
    defaultValues: { data },
  });

  useEffect(() => {
    const defaultValues = { data };
    reset({ ...defaultValues });
  }, [data]);

  const { fields, append, update, remove } = useFieldArray({
    name: 'data',
    control: control,
    keyName: 'fieldKey',
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDeleteModal = (idx: number) => {
    setId(idx);
    setIsDeleteModalOpen(true);
    setAnchorEl(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSubmit = () => {
    remove(id);
    setId(0);
    setIsDeleteModalOpen(false);
  };

  const open = Boolean(anchorEl);
  const popOverId = open ? 'simple-popover' : undefined;
  const modalTitle = name.includes('Position') ? 'Delete position' : 'Delete level';
  const text = name.includes('Position') ? 'Position' : 'Level';
  const modalText = `Are you sure that you want to delete this ${text.toLowerCase()}? All data will be lost.`;

  return (
    <FormControl className={classes.container}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{name}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields?.map((row, idx) => (
              <TableRow key={row.fieldKey} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" className={classes.cellLeft}>
                  {row.name}
                </TableCell>
                <TableCell className={classes.cellRight}>
                  <Button
                    className={classes.more}
                    onClick={handleClick}
                    endIcon={<MoreVertIcon className={classes.icon} />}
                  />
                  <Popover
                    className={classes.popOver}
                    id={popOverId}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Button className={classes.button}>Edit</Button>
                    <Button className={classes.deleteButton} onClick={() => handleOpenDeleteModal(idx)}>
                      Delete
                    </Button>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        modalTitle={modalTitle}
        modalText={modalText}
        onSubmit={handleDeleteSubmit}
      />
    </FormControl>
  );
};
