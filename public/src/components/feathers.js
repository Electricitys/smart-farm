import { createContext } from "react";
import feathers from "@feathersjs/feathers";
import feathersAuth from "@feathersjs/authentication-client";
import feathersSocket from "@feathersjs/socketio-client";
import io from "socket.io-client";

class Feathers {
  constructor() {
    let host = new URL(window.location.origin);
    host.protocol = process.env.REACT_APP_SERVER_PROTOCOL || window.location.protocol;
    host.hostname = process.env.REACT_APP_SERVER_HOSTNAME || window.location.hostname;
    host.port = process.env.PORT || process.env.REACT_APP_SERVER_PORT;

    const socket = io(host.toString());

    this.client = feathers();
    this.client.configure(feathersSocket(socket));
    this.client.configure(feathersAuth({
      storageKey: "accessToken"
    }))
  }

  doAuthentication(authentication, params) {
    return this.client.authenticate(authentication, params);
  }

  doLogout() {
    return this.client.logout();
  }

  doReAuthenticate(force) {
    return this.client.reAuthenticate(force);
  }

  doGet(name) {
    return this.client.get(name);
  }

  get logger() { return this.client.service("logger") }
  get datalake() { return this.client.service("datalake") }
  get users() { return this.client.service("users") }
}

export const FeathersContext = createContext(null);

export const FeathersProvider = ({ children }) => {
  return (
    <FeathersContext.Provider value={new Feathers()}>
      {children}
    </FeathersContext.Provider>
  )
}
