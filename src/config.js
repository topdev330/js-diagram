export function k8Relations(obj_1, obj_2) {
  let flag = false;
  if((obj_1.kind == "Service" && obj_2.kind == "Ingress") || (obj_1.kind == "Ingress" && obj_2.kind == "Service")) {
    var obj1, obj2;
    if(obj_1.kind == "Ingress") {
      obj1 = obj_2; obj2 = obj_1;
    } else {
      obj1 = obj_1; obj2 = obj_2;
    }
    obj2.spec.rules.forEach(function(rule) {
      rule.http.paths.forEach(function(path) {
        if(obj1.metadata.name == path.backend.serviceName) {
          flag = true;
          return flag;
        }
      })
    });
    obj1.spec.ports.forEach(function(obj1_port) {
      obj2.spec.rules.forEach(function(rule) {
        rule.http.paths.forEach(function(path) {
          if(obj1_port.port == path.backend.servicePort) {
            flag = true;
            return flag;
          }
        })
      });
    });
  }

  if((obj_1.kind == "Service" && obj_2.kind == "Pod") || (obj_1.kind == "Pod" && obj_2.kind == "Service")) {
    var obj1, obj2;
    if(obj_1.kind == "Pod") {
      obj1 = obj_2; obj2 = obj_1;
    } else {
      obj1 = obj_1; obj2 = obj_2;
    }
    if(obj2.metadata.labels.app == obj1.spec.selector.app) {
      flag = true;
      return flag;
    }
    obj1.spec.ports.forEach(function(obj1_port) {
      obj2.spec.containers.forEach(function(container) {
        container.ports.forEach(function(port) {
          if(obj1_port.targetPort == port.containerPort) {
            flag = true;
            return flag;
          }
        })
      });
    });
  }

  if((obj_1.kind == "PersistentVolume" && obj_2.kind == "PersistentVolumeClaim") || (obj_1.kind == "PersistentVolumeClaim" && obj_2.kind == "PersistentVolume")) {
    var obj1, obj2;
    if(obj_1.kind == "PersistentVolumeClaim") {
      obj1 = obj_2; obj2 = obj_1;
    } else {
      obj1 = obj_1; obj2 = obj_2;
    }
    if(obj1.metadata.name == obj2.spec.volumeName) {
      flag = true;
      return flag;
    }
  }

  if((obj_1.kind == "PersistentVolumeClaim" && obj_2.kind == "Pod") || (obj_1.kind == "Pod" && obj_2.kind == "PersistentVolumeClaim")) {
    var obj1, obj2;
    if(obj_1.kind == "Pod") {
      obj1 = obj_2; obj2 = obj_1;
    } else {
      obj1 = obj_1; obj2 = obj_2;
    }
    console.log("cc====>", obj2);
    obj2.spec.volumes.forEach(function(volumn) {
      if(volumn.persistentVolumeClaim && obj1.metadata.name == volumn.persistentVolumeClaim.claimName) {
        flag = true;
        return flag;
      }
    });
  }

  if((obj_1.kind == "ConfigMap" && obj_2.kind == "Pod") || (obj_1.kind == "Pod" && obj_2.kind == "ConfigMap")) {
    var obj1, obj2;
    if(obj_1.kind == "Pod") {
      obj1 = obj_2; obj2 = obj_1;
    } else {
      obj1 = obj_1; obj2 = obj_2;
    }
    obj2.spec.volumes.forEach(function(volume) {
      if(volume.configMap && obj1.metadata.name == volume.configMap.name) {
        flag = true;
        return flag;
      }
    });
    obj2.spec.containers.forEach(function(container) {
      container.volumeMounts.forEach(function(volumeMount) {
        if(obj1.data["nginx.conf"] == volumeMount.subPath) {
          flag = true;
          return flag;
        }
      }) 
    });
  }

  if((obj_1.kind == "Secret" && obj_2.kind == "Pod") || (obj_1.kind == "Pod" && obj_2.kind == "Secret")) {
    var obj1, obj2;
    if(obj_1.kind == "Pod") {
      obj1 = obj_2; obj2 = obj_1;
    } else {
      obj1 = obj_1; obj2 = obj_2;
    }
    obj2.spec.containers.forEach(function(container) {
      container.env.forEach(function(env1) {
        if(obj1.metadata.name == env1.valueFrom.secretKeyRef.name) {
          flag = true;
          return flag;
        }
        if(obj1.data.username == env1.valueFrom.secretKeyRef.key) {
          flag = true;
          return flag;
        }
      });
    });
  }

  return flag;
}