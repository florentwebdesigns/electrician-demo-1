"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/site";
import { Scene } from "./Visuals";
import { ArrowIcon, CloseIcon } from "./Icons";

function Media({ project, uid }: { project: Project; uid: string }) {
  if (project.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.photo} alt={`${project.title}, ${project.category.toLowerCase()} electrical project`} loading="lazy" />;
  }
  return <Scene kind={project.visual} uid={uid} className="scene" />;
}

export function WorkGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <>
      <div className="work-grid">
        {projects.map((p, i) => (
          <button
            type="button"
            key={p.id}
            className={`work-card work-card--${i + 1}`}
            data-reveal
            style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
            onClick={(e) => {
              lastTrigger.current = e.currentTarget;
              setActive(p);
            }}
            aria-haspopup="dialog"
          >
            <span className="work-card__media">
              <Media project={p} uid={`work-${p.id}`} />
            </span>
            <span className="work-card__overlay">
              <span className="work-card__cat">{p.category}</span>
              <span className="work-card__title">{p.title}</span>
              <span className="work-card__more">
                View details <ArrowIcon size={16} />
              </span>
            </span>
            {p.sample && <span className="sample-tag">Sample visual</span>}
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="modal-title"
        onClose={() => {
          setActive(null);
          lastTrigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) setActive(null);
        }}
      >
        {active && (
          <div className="modal__body">
            <div className="modal__media">
              <Media project={active} uid={`modal-${active.id}`} />
              {active.sample && <span className="sample-tag">Sample visual</span>}
            </div>
            <div className="modal__content">
              <p className="eyebrow">{active.category}</p>
              <h3 id="modal-title">{active.title}</h3>
              <p>{active.description}</p>
              {active.sample && (
                <p className="modal__note">
                  This is a placeholder illustration, not a completed W Sincinnati Electrical project. Real project
                  photos and details will replace it.
                </p>
              )}
              <a href="#contact" className="btn btn--primary" onClick={() => setActive(null)}>
                Discuss Your Project <ArrowIcon size={18} />
              </a>
            </div>
            <button type="button" className="modal__close" onClick={() => setActive(null)} aria-label="Close project details">
              <CloseIcon />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
