import { useEffect, useMemo } from "react";
import * as THREE from "three";
import oak from "@/assets/room/oak-floor.jpg";
import weave from "@/assets/room/woven-fabric.jpg";

/** Non-suspending local surfaces keep the room visible while maps decode. */
export function useSurfaceMap(kind: "oak" | "fabric", repeatX = 1, repeatY = 1) {
  const map = useMemo(() => {
    const texture = new THREE.TextureLoader().load(kind === "oak" ? oak : weave);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.anisotropy = 8;
    return texture;
  }, [kind, repeatX, repeatY]);
  useEffect(() => () => map.dispose(), [map]);
  return map;
}