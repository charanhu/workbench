import { ThresholdEffect } from './../../modules/project/shared/workspace/area-effect.model';
import { ClassificationResult } from '../api/classification.modal';
import { AnnotationComment } from './../../modules/project/shared/workspace/annotation.model';

export interface PositionStorage {
  height: number;
  left: number;
  top: number;
  width: number;
}

export interface SourceStorage {
  dataURL: string;
  id: string;
  title: string;
}

export interface FacsimileStorage {
  dataURL: string;
  id: string;
}

export interface FacsimileEffectsStorage {
  drawing: {
    active: boolean;
    width: number;
  };
  outlines: {
    active: boolean;
    level: number;
  };
  trace: {
    active: boolean;
    level: number;
  };
}

export interface PointStorage {
  x: number;
  y: number;
}

export interface AreaStorage {
  author: string;
  created: number;
  effects: Array<ThresholdEffect>;
  position: PositionStorage;
  source: SourceStorage['id'];
}

export interface DrawingStorage {
  author: string;
  created: number;
  dataURL: string;
  position: PositionStorage;
}

export interface AnnotationStorage {
  author: string;
  comments: Array<AnnotationComment>;
  created: number;
  points: Array<PointStorage>;
}

export interface GlyphStorage {
  author: string;
  created: number;
  gardinerCode: string;
  gardinerCodePredictions: Array<ClassificationResult>;
  locked: boolean;
  order: number;
  points: Array<PointStorage>;
}

export interface WordStorage {
  author: string;
  created: number;
  glyphs: Array<GlyphStorage>;
  isCartouche: boolean;
  order: number;
  position: PositionStorage;
  translation: string;
  transliteration: string;
}

export interface SentenceStorage {
  author: string;
  created: number;
  interpretation: string;
  order: number;
  position: PositionStorage;
  transliteration: string;
  words: Array<WordStorage>;
}

export interface ProjectStorage {
  annotations: Array<AnnotationStorage>;
  appVersion: string;
  areas: Array<AreaStorage>;
  created: number;
  drawings: Array<DrawingStorage>;
  effects: FacsimileEffectsStorage;
  facsimile: {
    generated: FacsimileStorage['id'];
    processed: FacsimileStorage['id'];
  };
  id: string;
  properties: {
    author: string;
    title: string;
  };
  sentences: Array<SentenceStorage>;
  sources: Array<SourceStorage['id']>;
  updated: number;
}
