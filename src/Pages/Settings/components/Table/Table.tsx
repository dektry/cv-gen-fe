import { useEffect, useState, useMemo } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import { useForm, useFieldArray } from 'react-hook-form';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { AddButton } from 'common-components/AddButton';
import { DeleteModal } from 'common-components/DeleteModal';
import { SkillsMatrixCreateEditModal } from '../SkillsMatrixCreateEditModal';

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
  skillMatrixId: string;
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
  matrixLoading?: boolean;
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
  matrixLoading,
}: IProps) => {
  const classes = useStyles({ theme });
  const navigate = useNavigate();

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

  const handleOpenDeleteModal = (el: IListElement, idx: number) => {
    setActiveListElement(el);
    setListElementNumericId(idx);
    setIsDeleteModalOpen(true);
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

  const handleEditClick = (id: string) => {
    navigate(generatePath(paths.hardSkillsMatrixDetails, { id }));
  };

  const handleOpenEditModal = (el: IListElement) => {
    setActiveListElement(el);
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

  const handleOpenCopyModal = (el: IListElement) => {
    setActiveListElement(el);
    setIsCopyModalOpen(true);
  };

  const handleCloseCopyModal = () => {
    setIsCopyModalOpen(false);
    setActiveListElement({} as IListElement);
  };

  const handleCopySubmit = (name: string, position?: IDBPosition) => {
    if (handleCopy && activeListElement.id && position) {
      handleCopy({ positionId: position.id || '', skillMatrixId: activeListElement.id });
    }
  };

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
                  {handleCopy && (
                    <Button
                      className={classes.button}
                      onClick={() => handleOpenCopyModal(row)}
                      endIcon={
                        <svg
                          style={{ marginRight: '12px' }}
                          width="13"
                          height="15"
                          viewBox="0 0 13 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.14706 15C0.841177 15 0.573529 14.8875 0.344118 14.6625C0.114706 14.4375 0 14.175 0 13.875V2.56875H1.14706V13.875H10.2088V15H1.14706ZM3.44118 12.75C3.13529 12.75 2.86765 12.6375 2.63824 12.4125C2.40882 12.1875 2.29412 11.925 2.29412 11.625V1.125C2.29412 0.825 2.40882 0.5625 2.63824 0.3375C2.86765 0.1125 3.13529 0 3.44118 0H11.8529C12.1588 0 12.4265 0.1125 12.6559 0.3375C12.8853 0.5625 13 0.825 13 1.125V11.625C13 11.925 12.8853 12.1875 12.6559 12.4125C12.4265 12.6375 12.1588 12.75 11.8529 12.75H3.44118Z"
                            fill="#333333"
                          />
                        </svg>
                      }
                    />
                  )}
                  <Button
                    className={classes.button}
                    onClick={() => (handleUpdate ? handleOpenEditModal(row) : handleEditClick(row.id || ''))}
                    endIcon={
                      <svg
                        style={{ marginRight: '12px' }}
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 11.0837V14H2.91626L11.5173 5.39897L8.60103 2.48271L0 11.0837ZM13.7725 3.14373C14.0758 2.84044 14.0758 2.35051 13.7725 2.04722L11.9528 0.227468C11.6495 -0.0758228 11.1596 -0.0758228 10.8563 0.227468L9.43314 1.6506L12.3494 4.56687L13.7725 3.14373Z"
                          fill="#333333"
                        />
                      </svg>
                    }
                  />
                  <Button
                    className={classes.button}
                    onClick={() => handleOpenDeleteModal(row, idx)}
                    endIcon={
                      <svg
                        style={{ marginRight: '12px' }}
                        width="12"
                        height="16"
                        viewBox="0 0 12 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.857143 14.2222C0.857143 15.2 1.62857 16 2.57143 16H9.42857C10.3714 16 11.1429 15.2 11.1429 14.2222V4.55556C11.1429 4.00327 10.6951 3.55556 10.1429 3.55556H1.85714C1.30486 3.55556 0.857143 4.00327 0.857143 4.55556V14.2222ZM12 1.77778C12 1.28686 11.602 0.888889 11.1111 0.888889H9.4249C9.15338 0.888889 8.89353 0.778478 8.70506 0.583024L8.4378 0.305864C8.24932 0.110411 7.98948 0 7.71795 0H4.28205C4.01052 0 3.75068 0.110411 3.5622 0.305864L3.29494 0.583025C3.10647 0.778478 2.84662 0.888889 2.5751 0.888889H0.888889C0.397969 0.888889 0 1.28686 0 1.77778C0 2.2687 0.397969 2.66667 0.888889 2.66667H11.1111C11.602 2.66667 12 2.2687 12 1.77778Z"
                          fill="#333333"
                        />
                      </svg>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SkillsMatrixCreateEditModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModaleClose}
        onSubmit={hanldeCreateSubmit}
        modalTitle={addModalTitle}
        label={text}
        buttonText={`Add ${text}`}
        data={positionsThatAreNotInMatrixList}
      />
      <SkillsMatrixCreateEditModal
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
        <SkillsMatrixCreateEditModal
          isOpen={isCopyModalOpen}
          onClose={handleCloseCopyModal}
          onSubmit={handleCopySubmit}
          modalTitle={copyModalTitle}
          label={text}
          buttonText={'Save'}
          data={positionsThatAreNotInMatrixList}
          matrixLoading={matrixLoading}
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
