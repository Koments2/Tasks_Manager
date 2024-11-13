import styles from './styles.module.css';
import cn from 'classnames';

import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import {useNavigate} from "react-router-dom";
import {getDateFromISOString} from "../../utils/getAge";
import {Task} from "../../components/TaskList/Types";
import {useDispatch} from "react-redux";
import {deleteTask} from "../../store/reducers/TasksReducer";
import successMessage from "../../const/tostify/success";

type Props = {
    paginatedInfo: Task[];
    navigateUrl: string;
    setAction: (action: any) => void;
    setCurrentPage: (page: number) => void;
    deleteUrl: any;
    handleUrl: string;
    deleteTitle: string;
    activeRead?: boolean;
    activeEdit?: boolean;
    activeDelete?: boolean;
};

const TActions = ({
                      paginatedInfo,
                      navigateUrl,
                      setAction,
                      deleteUrl,
                      handleUrl,
                      activeRead = true,
                      activeEdit = true,
                      activeDelete = true,
                      deleteTitle,
                      setCurrentPage,
                  }: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async (id: number) => {
        dispatch(deleteTask(id));
        if (paginatedInfo?.length === 1) setCurrentPage(1)
        successMessage(deleteTitle)
    };

    const handleEdit = (id: number) => {
        navigate(`/${handleUrl}/${id}`);
    };

    const handleFullInfo = (id: number) => {
        navigate(`/${navigateUrl}/${id}`);
    };

    return (
        <tbody>
        {paginatedInfo?.map((item, index) => (
            <tr
                key={item.id || index}
                className={`align-middle ${index % 2 === 0 ? "table-light" : ""}`}
            >
                {Object.keys(item).map((key, idx) => (
                    <td key={idx}>
                        <div className="text-truncate" style={{maxWidth: "200px"}}>
                            {item[key] !== null && item[key] !== undefined && item[key] !== "" ? (
                                ["createdAt",].includes(key) ? (
                                    getDateFromISOString(item[key].toString())
                                ) : (
                                    item[key].toString()
                                )
                            ) : (
                                "---"
                            )}
                        </div>
                    </td>
                ))}
                {(activeRead || activeDelete || activeEdit) && (
                    <td>
                        <div className="d-flex justify-content-center gap-2">
                            {activeRead && (
                                <div
                                    className={cn(styles['transition-transform'], styles['transform-hover'], 'text-secondary')}
                                    style={{cursor: "pointer"}}
                                    onClick={() => handleFullInfo(item.id)}
                                >
                                    <ImportContactsIcon/>
                                </div>
                            )}
                            {activeEdit && (
                                <div
                                    className={cn(styles['transition-transform'], styles['transform-hover'], 'text-warning')}
                                    style={{cursor: "pointer"}}
                                    onClick={() => handleEdit(item.id)}
                                >
                                    <CreateIcon/>
                                </div>
                            )}
                            {activeDelete && (
                                <div
                                    className={cn(styles['transition-transform'], styles['transform-hover'], 'text-danger')}
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <DeleteIcon/>
                                </div>
                            )}
                        </div>
                    </td>
                )}
            </tr>
        ))}
        </tbody>
    );
};

export default TActions;
