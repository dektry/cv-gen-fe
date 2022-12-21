import { useEffect, useState, useMemo } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

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
import Typography from '@mui/material/Typography';

import { AddButton } from 'common-components/AddButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { HardSkillsMatrixCreateEditModal } from '../HardSkillsMatrixCreateEditModal';

import paths from 'config/routes.json';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { IDBPosition } from 'models/IUser';

export interface IListElement {
  id?: string;
  positionId?: string;
  name: string;
}

export interface IHandleCopyProp {
  positionId: string;
  hardSkillMatrixId: string;
}

interface IProps {
  data: IListElement[];
  name: string;
  handleCreate?: (name?: string, position?: IDBPosition) => void;
  handleUpdate?: (data: IListElement) => void;
  handleDelete: (id: string) => void;
  handleCopy?: (data: IHandleCopyProp) => void;
  handleOpenDetailsPage?: (id: string) => void;
  positions?: IListElement[];
  addModalTitle: string;
  editModalTitle: string;
  copyModalTitle?: string;
  hardSkillsMatrixId?: string;
}

interface FormValues {
  data: IListElement[];
}

export const TableComponent = ({
  data,
  name,
  handleCreate,
  handleDelete,
  handleUpdate,
  handleCopy,
  positions,
  addModalTitle,
  editModalTitle,
  copyModalTitle,
}: IProps) => {
  const classes = useStyles({ theme });
  const navigate = useNavigate();

  const [popoverAnchorElement, setPopoverAnchorElement] = useState<HTMLButtonElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [listElementNumericId, setListElementNumericId] = useState(0);
  const [activeListElement, setActiveListElement] = useState<IListElement>({} as IListElement);

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

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>, el: IListElement, idx: number) => {
    setActiveListElement(el);

    setListElementNumericId(idx);
    setPopoverAnchorElement(event.currentTarget);
  };

  const handleClosePopover = () => {
    setPopoverAnchorElement(null);
    setActiveListElement({} as IListElement);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setPopoverAnchorElement(null);
  };

  const handleDeleteModalClose = () => {
    setActiveListElement({} as IListElement);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSubmit = () => {
    remove(listElementNumericId);
    handleDelete(activeListElement.id || '');
    setListElementNumericId(0);
    setIsDeleteModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModaleClose = () => {
    setActiveListElement({} as IListElement);
    setIsCreateModalOpen(false);
  };

  const hanldeCreateSubmit = (name: string, position?: IDBPosition) => {
    !positions && append({ name, positionId: position?.id || '' });
    if (handleCreate && position) {
      handleCreate(name, position);
    }
    setIsCreateModalOpen(false);
  };

  const handleEditClick = () => {
    navigate(generatePath(paths.hardSkillsMatrixDetails, { id: activeListElement.id }));
  };

  const handleOpenEditModal = () => {
    setPopoverAnchorElement(null);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setActiveListElement({} as IListElement);
  };

  const handleEditSubmit = (name: string) => {
    !positions &&
      update(listElementNumericId, { id: activeListElement.id, name, positionId: activeListElement.positionId });
    if (handleUpdate) {
      handleUpdate({ id: activeListElement.id || '', name });
    }
    setActiveListElement({} as IListElement);
    setIsEditModalOpen(false);
  };

  const handleOpenCopyModal = () => {
    setPopoverAnchorElement(null);
    setIsCopyModalOpen(true);
  };

  const handleCloseCopyModal = () => {
    setIsCopyModalOpen(false);
    setActiveListElement({} as IListElement);
  };

  const handleCopySubmit = (name: string, position?: IDBPosition) => {
    if (handleCopy && activeListElement.id && position) {
      handleCopy({ positionId: position.id || '', hardSkillMatrixId: activeListElement.id });
    }
  };

  const open = Boolean(popoverAnchorElement);
  const popOverId = open ? 'simple-popover' : undefined;
  const modalTitle = name.includes('Position') ? 'Delete position' : 'Delete level';
  const text = name.includes('Position') ? 'Position' : 'Level';
  const modalText = `Are you sure that you want to delete this ${text.toLowerCase()}? All data will be lost.`;

  const positionsIds = useMemo(() => fields.map((el) => el.positionId), [fields]);
  const positionsThatAreNotInMatrixList = useMemo(
    () => positions?.filter((el: IDBPosition) => !positionsIds.includes(el.id)),
    [positionsIds]
  );

  return (
    <FormControl className={classes.container}>
      <div className={classes.upperContainer}>
        <Typography variant="h2" sx={{ marginBottom: '24px' }}>
          {`${text.toUpperCase()}`}
        </Typography>
        <div className={classes.addButton}>
          <AddButton onClick={handleCreateModalOpen} />
        </div>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>{name}</TableCell>
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
                    onClick={(e) =>
                      handleClickPopover(e, { id: row.id || '', name: row.name, positionId: row.positionId }, idx)
                    }
                    endIcon={<MoreVertIcon className={classes.icon} color="disabled" />}
                  />
                  <Popover
                    className={classes.popOver}
                    id={popOverId}
                    open={open}
                    anchorEl={popoverAnchorElement}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    {handleCopy && (
                      <Button className={classes.button} onClick={handleOpenCopyModal}>
                        Copy
                      </Button>
                    )}
                    <Button className={classes.button} onClick={handleUpdate ? handleOpenEditModal : handleEditClick}>
                      Edit
                    </Button>
                    <Button className={classes.deleteButton} onClick={handleOpenDeleteModal}>
                      Delete
                    </Button>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <HardSkillsMatrixCreateEditModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModaleClose}
        onSubmit={hanldeCreateSubmit}
        modalTitle={addModalTitle}
        label={text}
        buttonText={`Add ${text}`}
        data={positionsThatAreNotInMatrixList}
      />
      <HardSkillsMatrixCreateEditModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEditSubmit}
        modalTitle={editModalTitle}
        label={text}
        buttonText={'Save'}
        inputValue={activeListElement.name}
        data={positions}
      />
      {handleCopy && copyModalTitle && (
        <HardSkillsMatrixCreateEditModal
          isOpen={isCopyModalOpen}
          onClose={handleCloseCopyModal}
          onSubmit={handleCopySubmit}
          modalTitle={copyModalTitle}
          label={text}
          buttonText={'Save'}
          data={positionsThatAreNotInMatrixList}
        />
      )}
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
