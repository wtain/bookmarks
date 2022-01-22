
import React, { useEffect, useRef, useState } from "react";
import BookmarkDto from "../../../domain/dto/BookmarkDto";
import {v4 as uuidv4} from 'uuid';
import cl from './BookmarkForm.module.css'
import TagsEditor from "../TagsEditor/TagsEditor";
import TagDto from "../../../domain/dto/TagDto";
import BookmarkUtils from "../../../utils/BookmarkUtils";

interface Props {
    create: (bookmark: BookmarkDto) => void;
    visibility: boolean;
    validation: (bookmark: BookmarkDto) => boolean;
}

const BookmarkForm: React.FC<Props> = (props: Props) => {

    const EmptyBookmark = { summary: "", contents: "" };

    const [bookmark, setBookmark] = React.useState(EmptyBookmark);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [tags, setTags] = useState<TagDto[]>([])
    const [currentTag, setCurrentTag] = React.useState(BookmarkUtils.createNewTag());
    const [valid, setValid] = React.useState(false);
    
    useEffect(() => {
        if (props.visibility) {
            if (inputRef.current !== null) {
                inputRef.current.focus();
            }
        }
        setBookmark(EmptyBookmark);
        setTags([]);
        setCurrentTag(BookmarkUtils.createNewTag());
    }, [props.visibility])

    const updateBookmark = (bookmark: BookmarkDto) => {
        setBookmark(bookmark);
        setValid(props.validation(bookmark));
    }

    const doAddBookmark = () => {
        const newBookmark: BookmarkDto = {...bookmark, created: new Date().toLocaleString(), id: uuidv4(), tags};
        if (!valid) {
            return;
        }
        props.create(newBookmark);
        setBookmark(EmptyBookmark);
        setValid(false);
        // if (inputRef.current !== null) {
        //     inputRef.current.focus();
        // }
    }

    const addBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        doAddBookmark();
    }

    const form_classes = [cl.bookmark_form];
    form_classes.push(valid ? cl.form_valid : cl.form_invalid);

    return (
        <form className={form_classes.join(" ")}>
            <input
                    placeholder="Summary" 
                    value={bookmark.summary} 
                    onChange={(e) => updateBookmark({...bookmark, summary: e.target.value} as BookmarkDto)} 
                    className={cl.input}
                    ref={inputRef}
                    />
            <div className={cl.textarea_wrapper}>
                <textarea rows={3}
                            placeholder="Contents" 
                            value={bookmark.contents} 
                            onChange={(e) => updateBookmark({...bookmark, contents: e.target.value} as BookmarkDto)} 
                            className={cl.textarea}
                            onKeyDown={(e) => {
                                if (e.ctrlKey && e.code === "Enter") {
                                   doAddBookmark();
                                   e.stopPropagation();
                                }
                            }}
                            />
            </div>
            <TagsEditor 
                    tags={tags} 
                    onTagAdded={() => {
                        let value = currentTag.name.trim()
                        if (value.length > 0) {
                            // console.log("Added: '" + value + "'")
                            // console.log("tags: '" + tags.join("','") + "'")
                            if (tags.find(t => t.name === value) === undefined) {
                                setTags([...tags, { ...currentTag, name: value }]);
                            }
                            setCurrentTag(BookmarkUtils.createNewTag());
                            // tags.push(value)
                        }
                    }} 
                    onDelete={(index: number) => {
                        // console.log("tags: '" + tags.join("','") + "'")
                        // console.log("Removing " + index)
                        const new_tags = tags.filter((v, i) => i !== index);
                        // console.log("tags: '" + new_tags.join("','") + "'")
                        setTags(new_tags)
                        //setTags(tags.slice(0, index).concat(tags.slice(index+1)));
                    }}
                    currentTag={currentTag}
                    onCurrentTagChange={(v) => {
                        let p = v.indexOf(" ")
                        if (p != -1) {
                            let value = v.substring(0, p).trim();
                            if (value.length > 0) {
                                setTags([...tags, { ...currentTag, name: value }]);
                            }
                            setCurrentTag({ ...BookmarkUtils.createNewTag(), name: v.substring(p+1) })
                        } else {
                            setCurrentTag({ ...currentTag, name: v })
                        }
                    }} />
            <button onClick={addBookmark} className={cl.button}>Add</button>
        </form>
    )
}

export default BookmarkForm;